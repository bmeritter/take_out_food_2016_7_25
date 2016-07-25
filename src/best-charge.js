function besstCharge(selectdItems) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();

  let formatedItems = formateIds(selectdItems);
  let itemsInfo = getItemsInfo(formatedItems, allItems);
  let itemSubtotal = calculateSubtotal(itemsInfo);
  let total = calculateTotal(itemSubtotal);
  let halfIds = getHalfId(promotions)
  let firstMethod = calculateFirstMethod(total)
  let secondMethodItem = calculateSecondMethod(itemSubtotal, halfIds);
  let secondMethod = calculateSecondTotal(secondMethodItem);
  let bestType = judge(firstMethod, secondMethod, total)
}

function fomateIds(selectedItems) {
  return selectedItems.map(function (item) {
    let temp = item.split(' x ');
    return {
      id: temp[0],
      count: parseInt(temp[1])
    }
  });
}

function getItemsInfo(formatedItems, allItems) {
  let itemsInfo = [];
  for(let item of formatedItems) {
    let exitItem = allItems.find(function (exit) {
      return item.id === exit.id;
    })
    if(exitItem) {
      itemsInfo.push(Object.assign({}, exitItem, {count: item.count}))
    }
  }
 return itemsInfo;
}

function calculateSubtotal(itemsInfo) {
  let itemSubtotal = [];
  for(let item of itemsInfo) {
    let sub = item.count * item.price;
    itemSubtotal.push(Object.assign({}, item, {subtotal: sub}))
  }
  return itemSubtotal;
}

function calculateTotal(itemSubtotal) {
  let total = 0;
  for(let item of itemSubtotal) {
    total += item.subtotal;
  }
  return total;
}

function getHalfId(promotions) {
  for(let item of promotions) {
    if(item.type === '指定菜品半价') {
      return item.items;
    }
  }
}

function calculateFirstMethod(total) {
  if(total >= 30) {
    return {
      save: 6,
      total:total - 6
    }
  }
  return {
    save: 0,
    total: total
  }
}

function calculateSecondMethod(itemSubtotal, halfIds) {
  let secondMethodItem = [];
  for(let item of itemSubtotal) {
    let exitItem = halfIds.find(function (id) {
      return id === item.id;
    })
    let save, subtotal;
    if(exitItem) {
      save = item.price / 2 ;
      subtotal = item.subtotal - save;
    }else {
      save = 0;
      subtotal = item.subtotal;
    }
    secondMethodItem.push(Object.assign({}, item, {secondSave: save, secondSubtotal: subtotal}))

  }
  return secondMethodItem;
}

function calculateSecondTotal(secondMethodItem) {
  let save = 0 ;
  let total = 0;
  for(let item of secondMethodItem) {
    save += item.secondSave;
    total += item.secondSubtotal;
  }
  return {
    save: save,
    total: total
  };
}

function judge(firstMethod, secondMethod, total) {
  let bestType ;
  let finalTotal;
  if(firstMethod.save <= secondMethod.save) {

    finalTotal =secondMethod.total
    bestType = {total: finalTotal,type: '指定菜品半价'};
  } else if(firstMethod.save === 0 ) {

    finalTotal = total;
    bestType = {total: finalTotal,type: 'null'};
  } else {

    finalTotal = firstMethod.total;
    bestType = {total: finalTotal,type: '满30减6元'};
  }
  return bestType;

}

