import { interval } from 'rxjs';

const observable = interval(1000); // phát số 0, 1, 2... mỗi giây

const subscription = observable.subscribe(value => {
    console.log(`Received: ${value}`);
});

setTimeout(() => {
    subscription.unsubscribe(); // hủy sau 5 giây
    console.log('Stopped');
}, 5000);