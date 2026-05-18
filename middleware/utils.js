export const youtube_parser = url => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const uniqueByKeepLast = (data, key) => {
  return [...new Map(data.map(x => [key(x), x])).values()];
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isNotEmpty = str => {
  var pattern = /\S+/;
  return pattern.test(str);
};
export const validateName = name => {
  var re = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
  return re.test(name);
};
export const validateNumber = number => {
  var re = /^[0]?[1-9]\d{9}$/;
  return re.test(String(number));
};
export const autoFocusInput = fieldId => {
  document.getElementById(fieldId).focus();
};
