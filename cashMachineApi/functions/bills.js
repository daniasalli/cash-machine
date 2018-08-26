calculate = function (total){
    var bills = [];
  if(total > 0 && isFinite(total) && total % 10 === 0) {
    bills.push({bill: 100, qty: Number.parseInt(total / 100)});
    total = total % 100;
    bills.push({bill: 50, qty: Number.parseInt(total / 50)});
    total = total % 50;
    bills.push({bill: 20, qty: Number.parseInt(total / 20)});
    total = total % 20;
    bills.push({bill: 10, qty: Number.parseInt(total / 10)});

    var billets = bills.filter(function (item) {
      if (item.qty > 0) {
        return item
      }
    });
    return billets;
  } else {
    throw new TypeError('Invalid number supplied');
  }
  }

module.exports = {calculate}