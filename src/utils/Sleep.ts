export default class Sleep {
    static now = (ms: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }
}