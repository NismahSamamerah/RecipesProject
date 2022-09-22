export class Utils {
    static generateID() {
        let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 9; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
        return s;
    }
}