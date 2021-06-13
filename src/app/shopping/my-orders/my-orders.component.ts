import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {  
  orders$: Observable<Order[]>;

  async ngOnInit() {
    this.orders$ = await this.authService.user$
    .pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
  }
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
      
      
  }



}
