/* 
    封装getSetting形式的promise;
*/

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            },
        })
    })
}

/* 
    封装chooseAddress形式的promise;
*/

export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            },
        })
    })
}


/* 
    封装openSetting形式的promise;
*/

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            },
        })
    })
}

/* 
    封装login形式的promise;
*/
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
        });
    })
}

/* 
    封装requestPayment形式的promise;
*/
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            // timeStamp: '',
            // nonceStr: '',
            // package: '',
            // signType: '',
            // paySign: '',
            // 这些参数都在pay中;
            ...pay,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}