const box = document.getElementById('floatingBox');
let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let velocity = { x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 };
let dragging = false;
let offset = { x: 0, y: 0 };
let isTyping = false;

function animate() {
  if (!dragging && !isTyping) {
    pos.x += velocity.x;
    pos.y += velocity.y;

    if (pos.x <= 0 || pos.x + box.offsetWidth >= window.innerWidth) velocity.x *= -1;
    if (pos.y <= 0 || pos.y + box.offsetHeight >= window.innerHeight) velocity.y *= -1;

    box.style.left = `${pos.x}px`;
    box.style.top = `${pos.y}px`;
  }

  requestAnimationFrame(animate);
}

box.addEventListener('mousedown', (e) => {
  if (!isTyping) {
    dragging = true;
    box.style.cursor = 'grabbing';
    offset.x = e.clientX - box.offsetLeft;
    offset.y = e.clientY - box.offsetTop;
  }
});

document.addEventListener('mousemove', (e) => {
  if (dragging) {
    pos.x = e.clientX - offset.x;
    pos.y = e.clientY - offset.y;
    box.style.left = `${pos.x}px`;
    box.style.top = `${pos.y}px`;
  }
});

document.addEventListener('mouseup', () => {
  dragging = false;
  box.style.cursor = 'grab';
});

// Detect typing state (focus/blur)
box.addEventListener('focus', () => {
  isTyping = true;
});

box.addEventListener('blur', () => {
  isTyping = false;
});

animate();
