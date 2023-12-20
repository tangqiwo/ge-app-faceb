/*
 * @Author: Galen.GE
 * @Date: 2023-06-11 16:58:18
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/__Popups/UserPrivacy/zh-CN.tsx
 * @Description:
*/
import React from 'react'
import { View, Text } from 'react-native'
import { LS as styles } from '../style';

export default () => {

  return (
    <View style={styles.C}>
      <View style={styles.V}><Text style={styles.P}> 本隐私政策（“本政策”）就巨象金业如何收集、维护、使用和公开个人资料进行说明。本政策适用于除某些特定产品和服务外巨象金业提供的所有服务，该特定产品和服务将适用特定的隐私政策。 </Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>1、收集和使用个人资料</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}> 1.1 巨象金业根据《个人资料（私隐）条例》收集、使用、披露、存储和处理客户个人资料，向客户提供最佳服务的同时将客户信息保密。已公开的信息或巨象金业持有且没有保密义务的信息不被视为保密信息。 </Text></View>
      <View style={styles.V}><Text style={styles.P}> 1.2 巨象金业提供的产品和服务需要依赖客户的个人资料才得以正常运行，因此客户需要提供或允许巨象金业收集必要的个人资料。客户同意巨象金业收集和持有的客户个人资料可能用于下列用途： </Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.1 遵从和配合拥有管辖权的法院和监管机构要求而向有关当局和其他政府机构披露；</Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.2 向执行场所、银行、支付服务提供商或任何第三方披露，以执行客户指令和满足提供服务的相关要求；</Text></View>
      <View style={styles.V}><Text style={styles.P}> 1.2.3 在开户过程以及交易账户存续期间，巨象金业可直接从客户或通过其他途径（包括但不限于征信机构、第三方验证服务机构、其他金融机构）获取客户信息，以确定客户身份和背景、进行业务运作和其他有关活动； </Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.4 使用客户的个人资料进行统计和其他分析，以确定客户可能感兴趣的产品和服务，改进服务内容和功能、开展客户关怀、提升客户体验等；</Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.5 仅限于必要范围内，向巨象金业的关联公司、代理机构披露，以做其他业务推广和营销，但会履行本协议下的保密义务；</Text></View>
      <View style={styles.V}><Text style={styles.P}> 1.2.6 仅限于必要范围内，向创建、维护或处理数据库、提供记录保存服务、电子邮件传输服务、电话服务及其他服务提供商披露，以协助巨象金业收集、存储、处理客户资料、联系客户，但会履行本协议下的保密义务； </Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.7 必要时，为保护和行使巨象金业的法定权利而作出披露。</Text></View>
      <View style={styles.V}><Text style={styles.P}>1.2.8 在不泄露个人资料的前提下，巨象金业有权对匿名化处理后的用户数据进行分析、挖掘和利用，有权对巨象金业产品的使用情况进行统计分析并用于可能的第三方信息共享。</Text></View>
      <View style={styles.V}><Text style={styles.P}>1.3 客户可不时查阅由巨象金业保存的其个人资料。若客户需更改个人资料，应根据客戶协议条款7.9处理有关事宜。</Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>2、隐私权限的具体用途</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1 巨象金业在客户使用服务过程中收集的信息，除法律规定情形外，都将事先征得客户同意， 请求的各隐私权限的具体用途如下：</Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.1 权限名称：设备属性信息（如IMEI、IMSI、设备型号、设备设置、操作系统版本、唯一设备标识符等软硬件特征信息）、设备连接信息（如IP地址、运营商、访问日期和时间等)</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：识别客户身份、记录系统故障、分析引起系统故障的原因</Text></View>
      <View style={styles.V}><Text style={styles.P}>使用场景或目的：客户遇到交易系统或行情报价故障时可向巨象金业反馈，以便进行产品和服务改善及优化。</Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.2 权限名称：访问地理位置信息</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：通过全球定位系统或网络位置信息获取地理位置信息</Text></View>
      <View style={styles.V}><Text style={styles.P}>使用场景或目的：对于首次使用巨象金业行情报价的客户，巨象金业将申请访问地理位置权限，并根据地理位置为客户配置最近的服务器线路，以便提供快捷的报价服务。</Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.3 权限名称：使用相机</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：拍摄照片或视频、完成扫描二维码、身份证识别</Text></View>
      <View style={styles.V}><Text style={styles.P}>使用场景或目的：对于首次使用交易账户开户、编辑个人资料头像调取摄像头拍摄功能时，巨象金业将申请获取客户的摄像头权限，以用于拍照使用图像识别服务。</Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.4 权限名称：存储或相册</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：提供读取、写入手机储存空间或相册的功能</Text></View>
      <View style={styles.V}><Text style={styles.P}>使用场景或目的：客户可以上传照片或更换头像、保存图片到手机。</Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.5 权限名称：使用麦克风</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：选择语音输入录制音频</Text></View>
      <View style={styles.V}><Text style={styles.P}> 使用场景或目的：对于首次使用交易账户开户的客户，巨象金业将申请获取客户的麦克风权限。投资交易功能由巨象金业的关联公司或合作的第三方机构提供，若客户选择使用投资交易功能，则需要向第三方机构提供个人资料。巨象金业将申请客户设备的相机、相册、录音权限，以用于客户向第三方机构提供开户所需文件、身份证明文件及完成开户或回访过程中的人脸识别或双录。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.6 权限名称：获取应用列表</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：获取设备上已安装的应用列表</Text></View>
      <View style={styles.V}><Text style={styles.P}> 使用场景或目的：客户首次访问巨象金业时，巨象金业将读取客户的应用安装列表，以防止恶意程序，确保客户账户安全，并在客户对外分享时为客户提供分享服务或帮助客户通过第三方账号登录。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>2.1.7 权限名称：访问日历</Text></View>
      <View style={styles.V}><Text style={styles.P}>权限功能说明：访问系统中的日历活动</Text></View>
      <View style={styles.V}><Text style={styles.P}>使用场景或目的：客户浏览巨象金业之活动、添加财经日历提醒时，巨象金业将申请访问客户的日历权限，以便提醒客户参加活动、安排未来的投资日程。</Text></View>
      <View style={styles.V}><Text style={styles.P}> 2.2 在客户使用巨象金业服务时，巨象金业可能会通过电话、短信、消息推送、工作通知、弹窗等方式向客户发送一种或多种类型的消息，例如安全验证、服务通知、身份验证等。若客户不愿接收此类商业信息或其他产品或服务信息，可以通过短信中提供的退订方式或直接联系巨象金业客服进行退订、通过弹窗页面上的“跳过”按钮或相关按钮关闭弹窗消息。巨象金业使用App自启动和关联启动其他App功能，以保障客户可以正常接收推送内容，避免遗漏。 </Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>3、使用Cookies和同类技术</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}>3.1 Cookies的使用</Text></View>
      <View style={styles.V}><Text style={styles.P}> 3.1.1 Cookies通常包括从网站计算机发送至客户浏览器并存储在客户计算机硬盘中的唯一识别号码或值。客户同意巨象金业可能会在客户的电脑设置和存取巨象金业Cookies，以便识别客户的设备、分析网站流量。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>3.1.2 巨象金业可能会使用Cookies来追踪客户浏览巨象金业网站的信息，收集的信息将通过技术手段进行匿名化处理。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2 SDK的使用</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.1 为保障服务的稳定运行或优化相关功能，巨象金业可能会接入由第三方提供的软件开发包（SDK）。巨象金业审慎监测合作方获取信息的SDK，以保护数据安全。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2 巨象金业目前接入下列第三方：</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.1 第三方名称：极光推送</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：推送消息通知</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：设备信息、网络信息与位置信息（如IP地址、WiFi状态、基站信息）、APP 安装列表信息。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.2 第三方名称：百度统计</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：统计分析</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：设备信息、位置信息、日志信息、其他信息(如IP地址、浏览器类型、使用语言、访问日期和时间、软硬件特征信息、网页记录、操作系统、分辨率）。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.3 第三方名称：友盟统计</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：提供统计分析服务，并通过地理位置校准数据准确性</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：Mac地址、唯一设备识别码（IMEI、GUID、Android ID、IDFA、IMSI、OPENUDID）。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.4 第三方名称：高德地图</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：帮助客户获取更快捷的报价</Text></View>
      <View style={styles.V}><Text style={styles.P}> 收集个人资料类型：设备信息（如IP地址、GNSS信息、WiFi状态、WiFi参数、WiFi列表、SSID、BSSID、基站信息、信号强度、设备信号强度、蓝牙信息、传感器信息、外部存储目录）、位置信息（如经纬度、粗略位置和精确位置）、设备标识信息（如IMEI、IDFA、IDFV、Android ID、MEID、OAID、IMSI、ICCID、MAC地址、硬件序列号）、当前应用信息（如应用名、版本号）、设备参数及系统信息（如系统属性、操作系统、运营商）。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.5 第三方名称：设备标识生成库</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：用于为设备生成唯一Device ID（设备识别号）</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：读取外置存储卡、手机状态和身份，写入外部存储卡。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.6 第三方名称：中国移动、中国联通、中国电信</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：根据客户选择，为客户提供一键登录验证、号码认证服务</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：设备信息、网络类型、网络地址、运营商类型、手机设备类型、操作系统、本机号码信息和硬件厂商。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.7 第三方名称：支付宝</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：为客户提供支付服务，处理和缓存客户的支付订单和支付状态</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：设备信息、网络设备、硬件地址、网络信息、读取存储（相册、媒体和文件）权限和手机状态。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.8 第三方名称：华为推送</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：推送消息通知</Text></View>
      <View style={styles.V}><Text style={styles.P}>收集个人资料类型：设备及应用信息、移动网络信息、日志信息、位置信息、客户云空间。</Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.9 第三方名称：OPPO推送</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：推送消息通知</Text></View>
      <View style={styles.V}><Text style={styles.P}> 收集个人资料类型：设备相关信息（如IMEI、OAID、IMSI、Android ID、手机地区设置、手机操作系统版本和语言、设备型号、序列号）、使用推送服务的应用信息（如APP名称、版本号、运行状态）、推送SDK版本号、网络信息（如IP或域名连接结果、当前网络类型）、消息发送结果、通知栏状态（如通知栏权限、用户点击行为）、锁屏状态。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.10 第三方名称：小米推送</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：推送消息通知</Text></View>
      <View style={styles.V}><Text style={styles.P}> 收集个人资料类型：安卓版：设备标识（如加密的Android ID、OAID）、使用推送服务的应用信息（如应用包名、版本号、运行状态）、设备信息（如设备厂商、设备型号、内存、操作系统版本、小米推送SDK版本）、设备归属地、网络类型、SIM卡运营商名称。其中网络类型和SIM卡运营商名称仅在设备本地读取，不会上传至小米服务器。iOS版：IDFV、应用包名、版本号、设备信息（如设备型号、操作系统版本、小米推送SDK版本）。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>3.2.2.11 第三方名称：VIVO推送</Text></View>
      <View style={styles.V}><Text style={styles.P}>功能：推送消息通知</Text></View>
      <View style={styles.V}><Text style={styles.P}> 收集个人资料类型：设备标识信息（如加密的Android ID、IMEI、EmmCID、ANDROIDID、GUID、UFSID、GAID、OPENID、VAID、OAID、RegID）、使用推送服务的应用信息（如应用包名、版本号、APPID、安装、卸载、恢复出厂设置、运行状态）、设备制造商、网络类型、国家码、设备类型、推送SDK版本号、设备型号、操作系统版本、消息发送结果、通知栏状态（如通知栏权限、用户点击行为）、锁屏状态。 </Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>4. 保障资料安全</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}>4.1 巨象金业致力确保网站安全且符合行业标准，以及运用信息安全防护工具包括防火墙、认证系统等防止未获授权的系统进入网站和存取资料。</Text></View>
      <View style={styles.V}><Text style={styles.P}> 4.2. 巨象金业将尽一切所能妥善保存其收集所得的客户个人资料，且只有获授权的雇员或代表巨象金业提供服务的公司可查阅有关资料。但鉴于互联网的公开特性，可能无法确保客户个人资料免受第三方蓄意干扰。凡通过巨象金业网站浏览第三方运作的网页，客户个人资料均不属上述个人资料私隐条例保障范围。 </Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>5. 客户权利</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}>对于巨象金业保存的客户个人资料，客户享有以下权利（其中部分权利只限特定情况）：</Text></View>
      <View style={styles.V}><Text style={styles.P}>5.1 查询权</Text></View>
      <View style={styles.V}><Text style={styles.P}> 客户有权随时访问其个人资料。客户可以通过“巨象金业-我的-头像-个人主页-编辑资料”查询或编辑昵称、个人简介，亦可通过“巨象金业-我的-个人资料”查询或编辑个人资料、修改邮箱、手机号码、用户中心密码、MT4密码等。 </Text></View>
      <View style={styles.V}><Text style={styles.P}>5.2 更正权</Text></View>
      <View style={styles.V}><Text style={styles.P}>当个人资料不准确、不完整时，客户有权要求巨象金业更新个人资料，唯需提供符合巨象金业要求之证明。</Text></View>
      <View style={styles.V}><Text style={styles.P}>5.3 删除权</Text></View>
      <View style={styles.V}><Text style={styles.P}> 若出现以下情况，客户可以向巨象金业申请删除其个人资料：巨象金业处理个人资料的行为违反法律法规、巨象金业在未征得客户同意的情况下收集或使用其个人资料、客户终止使用巨象金业的产品或服务或销户、巨象金业终止为客户提供产品或服务。 </Text></View>
      <View style={styles.V}><Text style={styles.P}><Text style={styles.PB}>6. 政策修订</Text></Text></View>
      <View style={styles.V}><Text style={styles.P}>巨象金业有权出于任何原因不时修订本隐私政策。修订后的政策将通过巨象金业平台公告或以其他适当方式通知客户。若客户继续使用巨象金业提供的产品或服务，即表示同意受本政策约束。</Text></View>
    </View>
  )
}
