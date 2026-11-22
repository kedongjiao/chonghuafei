// 初始化充值金额，并绑定网格点击事件。
const chargeAmount = [10, 20, 30, 50, 100, 200, 300, 500, 1000];
const allGridItem = document.querySelectorAll('.grid-item');
const phone = document.getElementById('phone');
const phoneTip = document.getElementById('phone_tip');
const bottomTip = document.querySelector('.bottom-tip');
const defaultPhoneTip = phoneTip.textContent;
const defaultBottomTip = bottomTip.textContent;
const validPhone = /^\d{11}$/;
let amount = null;

allGridItem.forEach((item, index) => {
    item.textContent = chargeAmount[index] + '元';
    item.addEventListener('click', () => {
        amount = chargeAmount[index];
        allGridItem.forEach((option) => {
            const selected = option === item;
            option.classList.toggle('selected', selected);
            option.setAttribute('aria-pressed', String(selected));
        });
    });
});

// 以 3-4-4 格式显示手机号。
function splitPhone(number) {
    return number.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
}

function readPhone() {
    return phone.value.replace(/\s/g, '');
}

// 调用鸿蒙应用注册的联系人方法。
function defaultContact() {
    let data;
    try {
        data = window.jsbridgeHandle.getContact();
    } catch {
        data = '';
    }

    const contact = typeof data === 'string' && /^(\d{11})_(.+)$/.exec(data);
    if (!contact) {
        bottomTip.textContent = '默认联系人不可用';
        return;
    }

    phone.value = splitPhone(contact[1]);
    phoneTip.textContent = contact[2];
    phone.removeAttribute('aria-invalid');
    bottomTip.textContent = defaultBottomTip;
}

document.getElementById('default-contact').addEventListener('click', defaultContact);
phone.addEventListener('input', () => {
    phoneTip.textContent = defaultPhoneTip;
    phone.removeAttribute('aria-invalid');
    bottomTip.textContent = defaultBottomTip;
});
phone.addEventListener('blur', () => {
    const number = readPhone();
    if (validPhone.test(number)) {
        phone.value = splitPhone(number);
    }
});

// 由鸿蒙应用通过 runJavaScript() 调用。
function recharge() {
    const number = readPhone();
    if (!validPhone.test(number)) {
        phone.setAttribute('aria-invalid', 'true');
        return '请输入正确的手机号';
    }

    phone.removeAttribute('aria-invalid');
    phone.value = splitPhone(number);
    if (amount === null) {
        return '请选择充值金额';
    }
    return `${phone.value}：成功充值${amount}元！`;
}
