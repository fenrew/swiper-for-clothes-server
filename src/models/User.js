const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { itemType } = require('./shared-types')
const Data = require('./Data')

const userSchema = new Schema ({
    tempToken: {
        type: String
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    seenItems: {
        type: [
            itemType
        ],
        default: []
    },
    favouriteItems: {
        type: [
            itemType
        ],
        default: []
    },
    likedItems: {
        type: [
            itemType
        ],
        default: []
    },
    dislikedItems: {
        type: [
            itemType
        ],
        default: []
    },
    shoppingCart: {
        type: [
            itemType
        ],
        default: []
    }
})

const updateList = async (self, itemList, itemId) => {
    const item = await Data.findById(itemId)
    if(item){
        const existingItem = itemList.find(item => item._id.equals(itemId))
        if(!existingItem){
            itemList.push(itemId)
            return self.save()
        } else {
            return Promise.reject(new Error(`Item with ID ${itemId} is already in the list`))
        }
    } else {
        return Promise.reject(new Error(`Item with ID ${itemId} does not exist`))
    }
}

const removeFromList = async (self, itemList, itemId) => {
    const itemIndex = itemList.findIndex(item => item._id.equals(itemId))
    itemList.splice(itemIndex, 1)
    return self.save()
}

userSchema.methods.updateSeenItem = function(itemId) {
    return updateList(this, this.seenItems, itemId)
}

userSchema.methods.updateFavouriteItem = function(itemId) {
    return updateList(this, this.favouriteItems, itemId)
}

userSchema.methods.updateLikedItem = async function(itemId) {
    await updateList(this, this.likedItems, itemId)
}

userSchema.methods.updateDislikedItem = function(itemId) {
    return updateList(this, this.dislikedItems, itemId)
}

module.exports = mongoose.model('User', userSchema)