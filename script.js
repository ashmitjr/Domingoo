function togglePanel() {
    const leftPanel = document.querySelector('.leftpanel');
    const hideBtn = document.querySelector('.hide-btn i');
    const canvas = document.querySelector('.canvas');

    hideBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('collapsed');

        if (leftPanel.classList.contains('collapsed')) {
            hideBtn.classList.replace('ri-arrow-left-s-line', 'ri-arrow-right-s-line');
            canvas.style.maxWidth = '82%';
        } else {
            hideBtn.classList.replace('ri-arrow-right-s-line', 'ri-arrow-left-s-line');
            canvas.style.maxWidth = '70%';
        }
    });

}

togglePanel();

function LayersPanel() {
    const layerItem = document.querySelector('.layer');

layerItem.addEventListener('click', () => {
  const targetId = layerItem.dataset.target;
  const element = document.getElementById(targetId);

 
  element.style.outline = '2px solid #fff';
});

}  
LayersPanel();
