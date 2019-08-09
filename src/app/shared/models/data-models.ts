import { Delivery } from '../../order/delivery';

export class Order {
    public orderItems = [];
    public delivery:Delivery;
    public status: string;
}

export class OrderItem {
    public name: string;
    public item: string;
    public itemCreatedAt: Date;
    public price: number;
    public quantity: number;
    public img: string;
    public instruction: string;
    public toppings: Topping[] = [];
    // public xtraToppings = [];

}

export class Topping {
    public amount: string;
    public double: Boolean;
    public kind: string;
    public location: string;
    public name: string;
    public price: number;
    public title: string;
}

export class User {
    constructor(
        private email = 'admin@yahoo.com',
        private password = 'admin',
        private token = '',
    ) {}
}