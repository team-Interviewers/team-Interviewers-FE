// CSR 렌더링 끝나고 실행
setTimeout(() => {
  /* Portal */
  const portalDiv = document.createElement('div');
  portalDiv.id = 'portal';
  document.body.insertBefore(portalDiv, document.body.firstChild);

  /* Rendering Modal in Portal */
  const modalDiv = document.createElement('div');
  modalDiv.style.position = 'fixed';
  modalDiv.style.top = '50%';
  modalDiv.style.left = '50%';
  modalDiv.style.transform = 'translate(-50%, -50%)';
  modalDiv.style.zIndex = '100000';
  modalDiv.style.padding = '20px';
  modalDiv.style.backgroundColor = 'white';
  modalDiv.style.border = '1px solid black';
  modalDiv.style.borderRadius = '5px';
  modalDiv.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  modalDiv.style.color = '#000000';
  modalDiv.style.transition = 'ease-in-out 0.15s';
  modalDiv.style.display = 'none';
  modalDiv.innerHTML = '<h1>Modal :)</h1>';

  portalDiv.appendChild(modalDiv);

  /* Event Trigger */
  let clickCount = 0;

  document.addEventListener('click', (event: MouseEvent) => {
    clickCount++;

    const targetElement = event.target as HTMLElement;
    if (targetElement) {
      // 추후 특정 컴포넌트 클릭 핸들링
    }

    // 10번 클릭마다 Trigger 실행
    if (clickCount % 10 === 0) {
      if (modalDiv.style.display === 'none') {
        modalDiv.style.display = 'block';
      } else {
        modalDiv.style.display = 'none';
      }
    }
  });
}, 5000);
