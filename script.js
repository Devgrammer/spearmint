document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('logo');

    document.addEventListener('click', function (e) {
        const clickX = e.clientX;
        const clickY = e.clientY;
        moveAndFlipLogoTowardsClick(logo, clickX, clickY);
    });
});

function moveAndFlipLogoTowardsClick(logo, clickX, clickY) {
    const logoRect = logo.getBoundingClientRect();
    const logoX = logoRect.left + logoRect.width / 2;
    const logoY = logoRect.top + logoRect.height / 2;
    const deltaX = clickX - logoX;
    const deltaY = clickY - logoY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    logo.style.transform = `translate(-50%, -50%) scaleX(${deltaX > 0 ? '-1' : '1'})`;

 
    logo.style.left = clickX - logoRect.width / 2 + 'px';
    logo.style.top = clickY - logoRect.height / 2 + 'px';
}
