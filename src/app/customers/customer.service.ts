import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customerCollection: AngularFirestoreCollection<Customer>;

  constructor(private db: AngularFirestore) { 
    this._customerCollection = this.db.collection("customers");
  }

  async addCustomer(customer: Customer): Promise<void> {
    await this._customerCollection.add(customer);
  }

  async getAllCustomers(): Promise<Customer[]> {
    const customerSnapshot = await this._customerCollection.ref.get();
    const customers: Customer[] = [];
    customerSnapshot.forEach((snapshot) => {
      const customer = snapshot.data();
      customers.push({
        ...customer,
        customerID: snapshot.id,
      });
    });
    return customers;
  }

  async getCustomerByID(customerID: string) {
    const customer = await firstValueFrom(this._customerCollection.doc<Customer>(customerID).valueChanges());
    return customer;
  }

}
