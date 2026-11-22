const phone = document.getElementById('phone');
const phoneLabel = document.getElementById('phone-label');
const contactButton = document.getElementById('default-contact');
const hint = document.getElementById('hint');
const initialHint = hint.textContent;

function normalizePhone(phoneNumber) {
  return phoneNumber.replace(/\s/g, '');
}

function setPhoneError(invalid) {
  if (invalid) {
    phone.setAttribute('aria-invalid', 'true');
  } else {
    phone.removeAttribute('aria-invalid');
  }
}

function fillDefaultContact() {
  try {
    const contact = window.jsbridgeHandle.getContact();
    const separator = contact.indexOf('_');
    const number = contact.slice(0, separator);
    const name = contact.slice(separator + 1);

    if (separator < 0 || !/^\d{11}$/.test(number) || !name) {
      hint.textContent = '默认联系人不可用';
      return;
    }

    phone.value = number;
    phoneLabel.textContent = name;
    hint.textContent = initialHint;
    setPhoneError(false);
  } catch {
    hint.textContent = '默认联系人不可用';
  }
}

function recharge() {
  const number = normalizePhone(phone.value);
  const validPhone = /^\d{11}$/.test(number);
  setPhoneError(!validPhone);

  if (!validPhone) {
    return '请输入正确的手机号';
  }

  const selectedAmount = document.querySelector('input[name="amount"]:checked');
  if (!selectedAmount) {
    return '请选择充值金额';
  }

  return `${number}：成功充值${selectedAmount.value}元！`;
}

contactButton.addEventListener('click', fillDefaultContact);
phone.addEventListener('input', () => {
  phoneLabel.textContent = '请输入手机号';
  setPhoneError(false);
});

window.recharge = recharge;
