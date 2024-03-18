document.addEventListener('DOMContentLoaded', function () {
    let flip = 1; 
    let moveInterval = null; 

    document.addEventListener('click', function (e) {
        const logo = document.getElementById('logo');
        const clickX = e.clientX;
        const clickY = e.clientY;

       
        clearInterval(moveInterval);

        moveAndFlipLogoTowardsClick(logo, clickX, clickY, flip);
        flip *= -1; 
    });
});

function moveAndFlipLogoTowardsClick(logo, clickX, clickY, flip) {
    const step = 2; // Adjust the step size
    const intervalDuration = 40;
    const logoRect = logo.getBoundingClientRect();
    const logoX = logoRect.left + logoRect.width / 2;
    const logoY = logoRect.top + logoRect.height / 2;
    const angle = Math.atan2(clickY - logoY, clickX - logoX);
    const deltaX = Math.cos(angle) * step;
    const deltaY = Math.sin(angle) * step;
    const currentX = logo.offsetLeft;
    const currentY = logo.offsetTop;
    const distanceX = clickX - currentX;
    const distanceY = clickY - currentY;
    const targetX = clickX - (distanceX > 0 ? 1 : -1) * logoRect.width / 2;
    const targetY = clickY - logoRect.height / 2;

    const totalDistance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));
    const steps = Math.ceil(totalDistance / step);

    const deltaXStep = (targetX - currentX) / steps;
    const deltaYStep = (targetY - currentY) / steps;

 
    let stepCount = 0;
    moveInterval = setInterval(function () {
        logo.style.left = (currentX + deltaXStep * stepCount) + 'px';
        logo.style.top = (currentY + deltaYStep * stepCount) + 'px';
        stepCount++;

        if (stepCount >= steps) {
            clearInterval(moveInterval);
            logo.style.left = targetX + 'px';
            logo.style.top = targetY + 'px';
            logo.style.transform = `translate(-50%, -50%) scaleX(${flip})`;

        }
    }, intervalDuration);
}
