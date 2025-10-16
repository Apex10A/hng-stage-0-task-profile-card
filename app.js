document.addEventListener('DOMContentLoaded', () => {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');

  const updateTime = () => {
    timeElement.textContent = Date.now().toString();
  };

  updateTime();
  setInterval(updateTime, 1000);
});