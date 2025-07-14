export const logger = {
  info: (msg, data = null) => {
    const log = {
      level: 'INFO',
      timestamp: getISTTime(),
      msg,
      data,
    };
    window._logs = window._logs || [];
    window._logs.push(log);
  },
  error: (msg, error = null) => {
    const log = {
      level: 'ERROR',
      timestamp: getISTTime(),
      msg,
      error,
    };
    window._logs = window._logs || [];
    window._logs.push(log);
  },
};

function getISTTime() {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true, 
  });
}
