describe('Take out food', function () {

  xit('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  xit('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  xit('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

});

describe('formateIds', function () {
  it('formateIds', function () {
    let selectedItems = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = [
      {
        id: 'ITEM0001',
        count: 1
      },{
        id: 'ITEM0013',
        count: 2
      },{
        id:'ITEM0022',
        count: 1
      }
    ];
    let formatedItems = fomateIds(selectedItems);

    expect(formatedItems).toEqual(expected)
  })
})

describe('getItemsInfo', function () {
  it('getItemsInfo', function () {
    let allItems = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }];
    let formatedItems = [{
      id: 'ITEM0001',
      count: 1
    }];
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1
      }
    ];

    let itemsInfo = getItemsInfo(formatedItems, allItems);

    expect(itemsInfo).toEqual(expected);
  })
})

describe('calculateSubtotal', function () {
  it('calculateSubtotal', function () {
    let itemsInfo = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1
      }
    ];

    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6
      }
    ];
    let itemSubtotal = calculateSubtotal(itemsInfo)

    expect(itemSubtotal).toEqual(expected)
  })
})

describe('calculateTotal', function () {
  it('calculateTotal', function () {
    let itemSubtotal = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6
      }
    ];
    let expected = 24;

    let total = calculateTotal(itemSubtotal);
    expect(total).toEqual(expected)
  })
})

describe('getHalfId', function () {
  it('getHalfId', function () {
    let promotions = [{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    let expected = ['ITEM0001', 'ITEM0022'];
    let halfIds = getHalfId(promotions);

    expect(halfIds).toEqual(expected)
  })
})


describe('calculateFirstMethod', function () {
  it('calculateFirstMethod', function () {
    let total = 39;
    let expected = {
      save: 6,
      total: 33
    };
    let firstMethod = calculateFirstMethod(total);

    expect(firstMethod).toEqual(expected)
  })

  it('calculateFirstMethod', function () {
    let total = 24;
    let expected = {
      save: 0,
      total: 24
    };
    let firstMethod = calculateFirstMethod(total);

    expect(firstMethod).toEqual(expected)
  })
})

describe('calculateSecondMethod', function () {
  it('calculateSecondMethod', function () {
    let itemSubtotal = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6
      }
    ];
    let halfIds = ['ITEM0001', 'ITEM0022'];
    let expected = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18,
        secondSave: 9,
        secondSubtotal: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6,
        secondSave: 0,
        secondSubtotal: 6
      }
    ];
    let secondMethodItem =calculateSecondMethod(itemSubtotal, halfIds);

    expect(secondMethodItem).toEqual(expected)
  })
})

describe('calculateSecondTotal', function () {
  it('calculateSecondTotal', function () {
    let secondMethodItem = [
      {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00,
        count: 1,
        subtotal: 18,
        secondSave: 9,
        secondSubtotal: 9
      },
      {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00,
        count: 1,
        subtotal: 6,
        secondSave: 0,
        secondSubtotal: 6
      }
    ];
    let expected = {
      save: 9,
      total: 15
    };

    let secondMethod = calculateSecondTotal(secondMethodItem);

    expect(secondMethod).toEqual(expected)
  })
})

describe('judge', function () {
  it('judge', function () {
    let secondMethod = {
      save: 9,
      total: 15
    };

    let firstMethod = {
      save: 0,
      total: 24
    };
    let total = 24;
    let expected = {
      total: 15,
      type: '指定菜品半价'
    };
    let bestType = judge(firstMethod, secondMethod, total)

    expect(bestType).toEqual(expected);
  })
})

















