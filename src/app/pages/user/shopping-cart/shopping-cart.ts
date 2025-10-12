import { Component } from '@angular/core';
import { CartService } from '../../../services/api/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  cartItems: any[] = [];
  couponCode: string = '';

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }
  // รวมราคาเกม
  get totalPrice() {
    const total = this.cartItems.reduce((sum, g) => sum + Number(g.price || 0), 0);
    return Number(total.toFixed(2));
  }
  
  // get discountedPrice() {
  //   let price = this.totalPrice;
  //   if (this.couponCode.trim().toUpperCase() === 'SALE10') price *= 0.9;
  //   return Number(price.toFixed(2));
  // }
  // ลบเกมออกจากรถเข็นทีละเกม
  removeItem(id: number) {
    this.cartService.removeItem(id);
  }
  // ลบเกมออกหมดทั้งตะกร้า
  clearCart() {
    this.cartService.clearCart();
  }
  // จ่ายเงิน
  async checkout() {
    if (this.cartItems.length === 0) {
      alert('กรุณาเลือกเกมก่อนชำระเงิน');
      return;
    }

    try {
      const res = await this.cartService.checkout(
        this.cartItems.map(g => g.id),
        this.couponCode
      );

      if (res?.success) {
        alert(`ชำระเงินสำเร็จ! Order ID: ${res.order_id}`);
        this.cartService.clearCart();
        // this.router.navigate(['/library']);
      } else {
        alert(res?.message || 'เกิดข้อผิดพลาดในการสั่งซื้อ');
      }
    } catch (err) {
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
      console.error(err);
    }
  }
}
