const fs = require('fs');

module.exports = {
    capitalize: function(item: string):string {
        return item.charAt(0).toUpperCase() + item.slice(1)
    },

    lower: function(item: string):string {
        return item.charAt(0).toLowerCase() + item.slice(1)
    }
};