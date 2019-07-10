import { Delivery } from '../../order/delivery';

export class Order {
    public orderItems = [];
    public delivery:Delivery;
}

export class OrderItem {
    public name: String;
    public item: String;
    public itemCreatedAt: Date;
    public price: Number;
    public quantity: Number;
    public img: String;
    public toppings: Topping[] = [];
    // public xtraToppings = [];

}

export class Topping {
    public amount: String;
    public double: Boolean;
    public kind: String;
    public location: String;
    public name: String;
    public price: Number;
    public title: String;
}
