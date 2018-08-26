var expect = require('chai').expect;
var bills = require('../functions/bills');

describe('generateBills()', function () {
  it('should return 1 bill of 50', function () {
    var billsMock = [];
    billsMock.push({bill:50, qty:1});
    var result = bills.calculate(50);
    expect(result).to.deep.equal(billsMock);

  });
});

describe('generateBills()', function () {
  it('should return error for 15', function () {
    expect(() => bills.calculate(15)).to.throw();
  });
});

describe('generateBills()', function () {
  it('should return error for negative non divisble by 10, ex. -10', function () {
    expect(() => bills.calculate(-10)).to.throw();
  });
});

describe('generateBills()', function () {
  it('should return error for negative numbers that are under 10, ex. -5', function () {
    expect(() => bills.calculate(-5)).to.throw();
  });
});

describe('generateBills()', function () {
  it('should return error for 0', function () {
    expect(() => bills.calculate(0)).to.throw();
  });
});

describe('generateBills()', function () {
  it('should return error for numbers containing decimals, ex. 60.7', function () {
    expect(() => bills.calculate(60.7)).to.throw();
  });
});