const request = require('request');
const iconv = require('iconv-lite');
const yiyuan_info = require('../models/clinic.js');

var hos_url={
"姑苏区白洋湾街道路南社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E7%99%BD%E6%B4%8B%E6%B9%BE%E8%A1%97%E9%81%93%E8%B7%AF%E5%8D%97%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区白洋湾街道路社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E7%99%BD%E6%B4%8B%E6%B9%BE%E8%A1%97%E9%81%93%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区沧浪街道三香社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E4%B8%89%E9%A6%99%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区沧浪街道胥江社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E8%83%A5%E6%B1%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区沧浪街道竹辉社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E7%AB%B9%E8%BE%89%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区虎丘街道虎阜社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E8%99%8E%E9%98%9C%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区虎丘街道留园社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E7%95%99%E5%9B%AD%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区虎丘区街道桐星社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E6%A1%90%E6%98%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区虎丘区街道西园路社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E8%A5%BF%E5%9B%AD%E8%B7%AF%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区金阊街道白莲社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E7%99%BD%E8%8E%B2%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区金阊街道彩香二村社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E5%BD%A9%E9%A6%99%E4%BA%8C%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区金阊街道彩香一村社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E5%BD%A9%E9%A6%99%E4%B8%80%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区金阊街道三元一村社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E4%B8%89%E5%85%83%E4%B8%80%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区金阊街道朱家庄社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E6%9C%B1%E5%AE%B6%E5%BA%84%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区平江街道白塔社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E7%99%BD%E5%A1%94%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区平江街道观前社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E8%A7%82%E5%89%8D%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区平江街道娄江社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E5%A8%84%E6%B1%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区平江街道梅巷社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E6%A2%85%E5%B7%B7%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区双塔街道沧浪亭社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%B2%A7%E6%B5%AA%E4%BA%AD%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区双塔街道横街社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%A8%AA%E8%A1%97%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区双塔街道杨枝社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%9D%A8%E6%9E%9D%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区双塔街道钟楼社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E9%92%9F%E6%A5%BC%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区苏锦街道光华社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%8B%8F%E9%94%A6%E8%A1%97%E9%81%93%E5%85%89%E5%8D%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区苏锦街道平江新城社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%8B%8F%E9%94%A6%E8%A1%97%E9%81%93%E5%B9%B3%E6%B1%9F%E6%96%B0%E5%9F%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区吴门桥街道沧浪新城社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E6%B2%A7%E6%B5%AA%E6%96%B0%E5%9F%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区吴门桥街道南环社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8D%97%E7%8E%AF%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区吴门桥街道润达社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E6%B6%A6%E8%BE%BE%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83",
"姑苏区吴门桥街道双桥社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8F%8C%E6%A1%A5%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99",
"姑苏区吴门桥街道友联社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/HRInfo/FindSHosp?name=%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8F%8B%E8%81%94%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99"
}
var img_url={
"姑苏区白洋湾街道路南社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E7%99%BD%E6%B4%8B%E6%B9%BE%E8%A1%97%E9%81%93%E8%B7%AF%E5%8D%97%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区白洋湾街道路社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E7%99%BD%E6%B4%8B%E6%B9%BE%E8%A1%97%E9%81%93%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区沧浪街道三香社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E4%B8%89%E9%A6%99%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区沧浪街道胥江社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E8%83%A5%E6%B1%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区沧浪街道竹辉社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E6%B2%A7%E6%B5%AA%E8%A1%97%E9%81%93%E7%AB%B9%E8%BE%89%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区虎丘街道虎阜社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E8%99%8E%E9%98%9C%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区虎丘街道留园社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E7%95%99%E5%9B%AD%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区虎丘区街道桐星社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E6%A1%90%E6%98%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区虎丘区街道西园路社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%99%8E%E4%B8%98%E8%A1%97%E9%81%93%E8%A5%BF%E5%9B%AD%E8%B7%AF%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区金阊街道白莲社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E7%99%BD%E8%8E%B2%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区金阊街道彩香二村社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E5%BD%A9%E9%A6%99%E4%BA%8C%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区金阊街道彩香一村社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E5%BD%A9%E9%A6%99%E4%B8%80%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区金阊街道三元一村社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E4%B8%89%E5%85%83%E4%B8%80%E6%9D%91%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区金阊街道朱家庄社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E9%87%91%E9%98%8A%E8%A1%97%E9%81%93%E6%9C%B1%E5%AE%B6%E5%BA%84%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区平江街道白塔社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E7%99%BD%E5%A1%94%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区平江街道观前社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E8%A7%82%E5%89%8D%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区平江街道娄江社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E5%A8%84%E6%B1%9F%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区平江街道梅巷社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%B9%B3%E6%B1%9F%E8%A1%97%E9%81%93%E6%A2%85%E5%B7%B7%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区双塔街道沧浪亭社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%B2%A7%E6%B5%AA%E4%BA%AD%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区双塔街道横街社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%A8%AA%E8%A1%97%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区双塔街道杨枝社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E6%9D%A8%E6%9E%9D%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区双塔街道钟楼社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%8F%8C%E5%A1%94%E8%A1%97%E9%81%93%E9%92%9F%E6%A5%BC%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区苏锦街道光华社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%8B%8F%E9%94%A6%E8%A1%97%E9%81%93%E5%85%89%E5%8D%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区苏锦街道平江新城社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E8%8B%8F%E9%94%A6%E8%A1%97%E9%81%93%E5%B9%B3%E6%B1%9F%E6%96%B0%E5%9F%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区吴门桥街道沧浪新城社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E6%B2%A7%E6%B5%AA%E6%96%B0%E5%9F%8E%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区吴门桥街道南环社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8D%97%E7%8E%AF%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区吴门桥街道润达社区卫生服务中心":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E6%B6%A6%E8%BE%BE%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E4%B8%AD%E5%BF%83_min.jpg",
"姑苏区吴门桥街道双桥社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8F%8C%E6%A1%A5%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg",
"姑苏区吴门桥街道友联社区卫生服务站":"https://app.szswjw.gov.cn:65005/HRMapOut/Images/hosp/%E5%A7%91%E8%8B%8F%E5%8C%BA%E5%90%B4%E9%97%A8%E6%A1%A5%E8%A1%97%E9%81%93%E5%8F%8B%E8%81%94%E7%A4%BE%E5%8C%BA%E5%8D%AB%E7%94%9F%E6%9C%8D%E5%8A%A1%E7%AB%99_min.jpg"


}
var  isvaccination={
    "否":false,
    "是":true
}
for(var key in hos_url){
    var url=hos_url[key];
    request.get(url,{strictSSL:false,encoding : null},function(err,res){      //需要在程序中加入 strictSSL:false 参数，否则会报错
    if(err){
        console.log(err);
    }
    else{
        var result = iconv.decode(res.body, 'utf8');
        var jsondata=JSON.parse(result)
        var hosp = jsondata["hosp"]
        var departs = jsondata["departs"]
        var departs_info=[];
        for(var i=0;i<departs.length;i++){
            departs_info.push({
                DepartIntro: departs[i]["DepartIntro"],
                DepartName: departs[i]["DepartName"]
            })
        }
        var coord = [];
        coord.push(Number(hosp["X"]));
        coord.push(Number(hosp["Y"]));
        var geometry={
            type:"Point",
            coord:coord
        }
        var yiyuan = new yiyuan_info({
            Address: hosp["Address"],
            Association: hosp["Association"],
            Beds: hosp["Beds"],
            Bus: hosp["Bus"],
            Equipment: hosp["Equipment"],
            FamilyDoctorPhone: hosp["FamilyDoctorPhone"],
            Groups: hosp["Groups"],
            HospName:hosp["HospName"],
            HospWebAddr: hosp["HospWebAddr"],
            ID: hosp["ID"],
            InsureTypeCoverage: hosp["InsureTypeCoverage"],
            Intro: hosp["Intro"],
            IsVaccination: isvaccination[hosp["IsVaccination"]],     //是否提供注射疫苗服务
            Kind:hosp["Kind"],               //性质
            OrgType: hosp["OrgType"],
            Phone: hosp["Phone"],
            Picture: img_url[hosp["HospName"]],
            geometry:geometry,
            X: hosp["X"],
            Y: hosp["Y"],
            Zone:hosp["Zone"],
            time: hosp["time"],
            clinic_url:hos_url[hosp["HospName"]],
            departs:departs_info
        })
        yiyuan.save(function(err){
            if(err){
                console.log(err);
            }else{
                
                console.log('The data is saved');
            }
        });
    }
})
}






