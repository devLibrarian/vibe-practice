document.addEventListener('DOMContentLoaded', () => {
    // 요소들 가져오기
    const modal = document.getElementById('reservation-modal');
    const openBtn = document.getElementById('open-modal');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('reservation-form');

    // 1. 모달 제어 (메인 페이지용)
    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // 2. Formspree 제출 처리 (메인 모달 폼 또는 독립 예약 페이지 폼 모두 대응)
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }

            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://formspree.io/f/xlgpwprz', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('예약 문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!');
                    form.reset();
                    
                    // 모달 안에 있는 폼이라면 모달 닫기
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                } else {
                    alert('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                alert('네트워크 오류가 발생했습니다.');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '예약 신청하기';
                }
            }
        });
    }
});
