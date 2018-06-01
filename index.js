
function ToolLibrary() {
}

function require() {  //私有函数
    throw new Error('参数缺失！！！');
}

ToolLibrary.prototype.noRepeat=function(arr = require()){
    return [...new Set(arr)];
    //return Array.from(new Set(arr))
    //return arr.filter((item, index, array) =>  array.indexOf(item) === index);
};

ToolLibrary.prototype.sorting=function(arr = require()){
    if(!this.isArray(arr)){
        return '不是数组'
    }
    if(arr.length<=10){
        this.insertionSort(arr);
    }else{
        this.quickSort(arr);
    }
};

ToolLibrary.prototype.largestNArr = function(arr = require(),n = require()){
    if(n<1 || this.isClass(arr) !== "Array"){
        return '参数问题！！'
    }

    if(!arr.every(item=>this.isClass(item) === 'Number')){
        return '数组每一项都必须是数字'
    }

    arr = this.noRepeat(arr);

    arr = this.sorting(arr);

    return arr[n-1];
};  //求数组中第n大的数

ToolLibrary.prototype.bubbleSort = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }
    for(let i=0,len=arr.length-1;i<len;i++){
        for(let j=i+1;j<len-i;j++){
            if(arr[i]<arr[j]){
                [arr[i],arr[j]] = [arr[j],arr[i]]
            }
        }
    }
    return arr;
};

ToolLibrary.prototype.quickSort = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }

    let len = arr.length;
    if(len<=1) return arr;
    let pivot = arr.splice(0,1)[0],left=[],right=[];
    for(let i=0;i<len-1;i++){
        if (arr[i] > pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...order(left),pivot,...order(right)];
};

ToolLibrary.prototype.insertionSort = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }

    let len = arr.length;
    var preIndex, current;
    for(let i=1;i<len;i++){
        preIndex = i-1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] < current){
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
};

ToolLibrary.prototype.selectionSort = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }

    let len = arr.length;
    let index;
    for(let i = 0; i < len-1 ;i++){
        index = i;
        for(let j = i + 1 ; j<len; j++){
            if(arr[j] > arr[index]){//寻找最小的数
                index = j;//保存最小数的索引
            }
        }
        [arr[i],arr[index]] = [arr[index],arr[i]]
    }
    return arr;
};

ToolLibrary.prototype.min = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }
    return Math.min(...arr);
    //return Math.min.apply(null,arr);
};

ToolLibrary.prototype.max = function (arr = require()) {
    if(!this.isArray(arr)){
        return '不是数组'
    }
    return Math.max(...arr);
    //return Math.max.apply(null,arr);
};

ToolLibrary.prototype.shallowClone = function (sourceData = require()) { //对象或者是数组的浅拷贝
    if(this.isClass(sourceData)==="Object"){
        return {...sourceData};
    }else if(this.isClass(sourceData)==="Array"){
        return [...sourceData];
    }
    return sourceData;
};

ToolLibrary.prototype.deepClone = function(obj = require()){
    var result,oClass=this.isClass(obj);
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(let key in obj){
        var copy=obj[key];
        if(this.isClass(copy)=="Object" || this.isClass(copy)=="Array"){
            //递归调用 在mutation中不能使用callee 严格模式
            try{
                result[key]=arguments.callee(copy);
            }catch (err){
                result[key]=this.deepClone(copy);
            }
        }else{
            result[key]=obj[key];
        }
    }
    return result;
};

ToolLibrary.prototype.countRepeat = function (data = require()) { //统计数组或者是字符串中元素出现次数  数组不完善
    let obj = {};
    if(this.isClass(data)==="String"){
        data = data.split("");
    }else if(this.isClass(data)!=="Array"){
        return '参数只能是字符串或者数组';
    }

    data = data.filter(item=>!!item);

    for(let i=0,len=data.length;i<len;i++){
        obj[data[i]] = obj[data[i]] ? ++obj[data[i]] : obj[data[i]]=1;
    }
    return obj;
};

ToolLibrary.prototype.isClass = function (o = require()){
    return {}.toString.call(o).slice(8,-1);
};

ToolLibrary.prototype.longestNonDescendingSequence = function(arr = require()) {
    if(this.isClass(arr) !== "Array"){
        return '参数问题！！'
    }

    if(!arr.every(item=>this.isClass(item) === 'Number')){
        return '数组每一项都必须是数字'
    }

    let length = arr.length,arr1=[],arr2=[],arr3=[];
    arr1[0] = 1;arr2[0] = 0;arr2[length-1] = length-1;arr1[length-1] = 1;
    for(let i=length-2;i>=0;i--){
        arr1[i] = 1;arr2[i] = i;
        for(let j = i+1;j<=length-1;j++){
            if(arr[i]<arr[j]){
                if(arr1[i] <= arr1[j]){
                    arr1[i] = arr1[j]+1;
                    arr2[i] = j
                }
            }
        }
    }
    let tag=[],max = Math.max.apply(null, arr1);
    for(let i =0;i<length;i++){
        if(arr1[i] == max){
            tag.push(i)
        }
    }

    let arrTemp=[];
    tag.forEach((item)=>{
        for(let i =item;i<length;){
            arrTemp.push(arr[i]);
            if(arrTemp.length >= max){
                break
            }
            i = arr2[i];
        }
        arr3.push(arrTemp);
    });
    return {
        max:max,
        sequence:arr3
    }
};

//let tool = new ToolLibrary();

//export default new ToolLibrary();


