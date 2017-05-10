function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

var strategies = {
  'Aged Brie': function(item) {
    item.quality = Math.min(item.quality + 1, 50);
  },
  'Sulfuras, Hand of Ragnaros': function(item) {
    // this was previously a bug, sulfuras should always have a 80 quality score
    // anything else is clearly a mistake!
    item.quality = 80;
  },
  'Backstage passes to a TAFKAL80ETC concert': function(item) {
    item.sell_in--;
    if (item.sell_in < 0) {
      item.quality = 0;
    } else if (item.sell_in < 5) {
      item.quality = Math.min(item.quality + 3, 50);
    } else if (item.sell_in < 10) {
      item.quality = Math.min(item.quality + 2, 50);
    } else {
      item.quality = Math.min(item.quality + 1, 50);
    }
  },
  'Conjured': function(item) {
    item.sell_in--;
    if (item.sell_in < 0) {
      // VERIFY: Is this correct? 4x as normal after sell-in date?
      item.quality = Math.max(0, item.quality - 4);
    } else {
      item.quality = Math.max(0, item.quality - 2);
    }
  },
  '__standard': function(item) {
    item.sell_in--;
    if (item.sell_in < 0) {
      item.quality = Math.max(0, item.quality - 2);
    } else {
      item.quality = Math.max(0, item.quality - 1);
    }
  }
};

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (strategies[items[i].name]) {
      strategies[items[i].name](items[i]);
    } else {
      strategies['__standard'](items[i]);
    }
  }
}
