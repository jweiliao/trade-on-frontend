// 先寫一筆暫時的假 post，為了測試 UI 顯示畫面用，等串接後再帶入後端的資料
const post = {
  _id: '001',
  itemName: '第一筆物品',
  quantity: 1,
  givenAmount: '國 X 世華 (013)1234 9999 0000 8888',
  itemStatus: '二手',
  tradingOptions: {
    convenientStore: {
      storeCode: '000 111 222',
      storeName: '全家中正店',
      fee: 60,
    },
    faceToFace: {
      region: '台北市',
      district: '中正區',
      fee: 0,
    },
  },
  payer: '索取者',
  receiverName: '曾有好',
  receiverPhone: '0912345678',
  isGoal: false,
  isPublic: true,
  owner: '使用者的ObjectId',
  category: {
    _id: '分類的ObjectId',
    categoryName: '分類名稱',
  },
}

// 帶入 post 的資料
const DeliveryData = {
  userStatus: 'giver',
  deliveryStatus: 'delivering',
  tradingOptions: {
    // 面交的資訊
    faceToface: {
      location: `${post.tradingOptions.faceToFace.region}${post.tradingOptions.faceToFace.district}`,
      time: '請與對方聯絡',
      done: '恭喜您完成這次的交易！',
    },
    // 店到店的資訊
    convenientStore: {
      asking: '等待對方輸入店到店資訊',
      chargePaying: {
        charge: `${post.tradingOptions.convenientStore.fee} 元`,
        account: `${post.givenAmount}`,
      },
      delivering: {
        name: `${post.receiverName}`,
        phone: `${post.receiverPhone}`,
        storeNumber: `${post.tradingOptions.convenientStore.storeCode}`,
        storeName: `${post.tradingOptions.convenientStore.storeName}`,
      },
      done: '恭喜您完成這次的交易！',
    },
  },
}

export default DeliveryData
