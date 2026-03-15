document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('reservation-modal');
    const openBtn = document.getElementById('open-modal');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('reservation-form');

    // 모달 열기
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    });

    // 모달 닫기
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Formspree 제출 처리
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';

        const formData = new FormData(form);
        
        try {
            // 여기에 본인의 Formspree ID를 넣으세요 (예: https://formspree.io/f/xknkyozk)
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
                closeModal();
            } else {
                alert('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('네트워크 오류가 발생했습니다.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '예약 신청하기';
        }
    });
});
