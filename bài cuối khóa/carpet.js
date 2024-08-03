document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('#buy-button');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Chức năng mua hàng sẽ được thêm sau.');
        });
    });
});
