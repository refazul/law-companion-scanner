export function window_open(url) {
    window.open(url, '_blank');
}
export function window_close() {
    window.close();
}
export function window_close_delayed() {
    setTimeout(function () {
        window_close();
    }, Math.floor(Math.random() * 1 * 1000) + 1);
}