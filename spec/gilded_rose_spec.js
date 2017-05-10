describe('Gilded Rose Item', function() {

    it('has a name', function() {
        items = [ new Item('foo', 0, 0) ];
        update_quality();
        expect(items[0].name).toEqual('foo');
    });

    it('degrades sell in and quality scores daily', function() {
        items = [ new Item('foo', 2, 10) ];
        update_quality();
        expect(items[0].sell_in).toEqual(1);
        expect(items[0].quality).toEqual(9);
    });

    it('degrades items twice as fast after sell by date', function() {
        items = [ new Item('foo', 0, 10) ];
        update_quality();
        expect(items[0].quality).toEqual(8);
    });

    it('never degrades to a negative item quality score', function() {
        items = [ new Item('foo', 0, 0) ];
        update_quality();
        expect(items[0].quality).toEqual(0);
    });

    it('never become too good to be true - greater than 50', function() {
        items = [ new Item('Aged Brie', 0, 50) ];
        update_quality();
        expect(items[0].quality).toEqual(50);
    });

    describe('aged brie', function() {

        it('never degrades', function() {
            items = [ new Item('Aged Brie', 2, 50) ];
            update_quality();
            expect(items[0].quality).toEqual(50);
        });

    });

    describe('conjured items', function() {

        it('degrade twice as fast as normal items', function() {
            items = [ new Item('Conjured', 1, 10), new Item('Conjured', 0, 10) ];
            update_quality();
            expect(items[0].quality).toEqual(8);
            // VERIFY: Is this correct? 4x as normal after sell-in date?
            expect(items[1].quality).toEqual(6);
        });

    });

    describe('sulfuras', function() {

        it('never has to be sold', function() {
            items = [ new Item('Sulfuras, Hand of Ragnaros', 2, 80) ];
            update_quality();
            expect(items[0].sell_in).toEqual(2);
        });

        it('never decreases in value', function() {
            items = [ new Item('Sulfuras, Hand of Ragnaros', 2, 80) ];
            update_quality();
            expect(items[0].quality).toEqual(80);
        });

    });

    describe('backstage passes', function() {

        var backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

        it('increases in quality as sell-in value increases', function() {
            items = [ new Item(backstagePass, 12, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(11);
            expect(items[0].quality).toEqual(11);
        });

        it('increase quality when there are 11 days left to sell', function() {
            items = [ new Item(backstagePass, 11, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(10);
            expect(items[0].quality).toEqual(11);
        });

        it('doubles quality increase when there are 10 days left to sell', function() {
            items = [ new Item(backstagePass, 10, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(9);
            expect(items[0].quality).toEqual(12);
        });

        it('doubles quality increase when there are 6 days left to sell', function() {
            items = [ new Item(backstagePass, 6, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(5);
            expect(items[0].quality).toEqual(12);
        });

        it('triples quality increase when there are 5 days left to sell', function() {
            items = [ new Item(backstagePass, 5, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(4);
            expect(items[0].quality).toEqual(13);
        });

        it('triples quality increase when there are 1 days left to sell', function() {
            items = [ new Item(backstagePass, 1, 10) ];
            update_quality();
            expect(items[0].sell_in).toEqual(0);
            expect(items[0].quality).toEqual(13);
        });

        it('has no value after the concert', function() {
            items = [ new Item(backstagePass, 0, 30) ];
            update_quality();
            expect(items[0].sell_in).toEqual(-1);
            expect(items[0].quality).toEqual(0);
        });

    });

});
