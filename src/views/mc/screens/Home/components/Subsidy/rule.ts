export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .wrapper{
      height: calc(100%);
      margin-top: 1rem;
      overflow: scroll;
      overscroll-behavior: contain;
      padding: 0 0.64rem;
      box-sizing: border-box;
      position: relative;
    }
    div{
      margin-top: 1.06667rem;
    }
    div span{
      color: #bf9d55;
      font-weight: 700;
      font-size: 0.85333rem;
    }
    table{
      margin: 0.53333rem auto;
      border-collapse: collapse;
    }
    thead tr{
      color: #fff;
      background-color: #bf9d55;
    }
    th{
      text-align: center;
      display: table-cell;
      padding: 0.26667rem;
      font-weight: 400;
      line-height: 1.25;
      border-bottom: 0.05333rem solid #e0e0e0;
      border-right: 0.05333rem solid #e0e0e0;
    }
    td{
      border: 0.05333rem solid #bf9d55;
      text-align: center;
      padding: 0.26667rem;
      font-weight: 400;
      line-height: 1.25;
    }
  </style>
  <script>
    var docEl = document.documentElement,
      resizeEvt ='orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 320) + 'px';
      document.body.style.height = docEl.clientHeight + 'px';
      document.body.style.width = docEl.clientWidth + 'px';
    };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    recalc()
  </script>
  <script>
    window.onload = () => {
      document.querySelector('#start').innerHTML = window.startDate;
      document.querySelector('#end').innerHTML = window.endDate;
    }
  </script>
</head>

<body>
  <div class="wrapper p5NKfsVBUnYm2M4TWKOn">
    <div><span>活动时间：</span><i id="start"></i>-<i id="end"></i>北京时间</div>
    <div><span>交易时间：</span> 登记参加活动当天起30天内（所有天数为自然日） </div>
    <div><span>活动对象：</span> 未参加过新客活动的专业投资者客户 </div>
    <div><span>活动产品：</span> XAUUSD Pro &amp; XAGUSD Pro </div>
    <div><span>活动方式：</span> 巨象专业投资者客户，凭MT4账户净值于官网相关活动页面自助登记，最高领取30,000美元赠金。活动期间交易满500手，更可获额外加赠华为Mate 60 Pro 12GB+512GB
      手机一部。</div>
    <div><span>活动规则：</span><br> <br>1. 活动期间，客户开立MT4账号并完成注资，即可凭 MT4账户净值，申请相应等级的赠金，总额高达$30,000。赠金分为两阶段发放：<p>
        •&nbsp;首笔赠金：客户成功申请后，首笔赠金即时添加至MT4账户，在交易时间内完成首笔手数要求，首笔赠金转为可提现状态；
        <br><br>•&nbsp;注资特惠：开户获取MT4账号后24小时内注资达标，额外加送高达$100首笔赠金，需完成手数不变；
        <br><br>•&nbsp;交易赠金：不取款继续交易可获得交易赠金，客户在交易时间内的手数将按3美元/手获得对应回赠，直至领完全部交易赠金</p>
      <br>2.专业投资者客户，金/银交易同享每手最高26美元点差优惠（0.01手起算）。 <br>
      <div class="container"><span>MT4净值及可申请赠金对照表（单位：美元）：</span>
        <div style="overflow-x: auto;">
          <table style="min-width: 500px;">
            <thead>
              <tr>
                <th>MT4净值</th>
                <th>首笔赠金</th>
                <th>开户24小时注资赠金</th>
                <th>完成手数</th>
                <th>交易赠金</th>
                <th>每手回赠</th>
                <th>总赠金</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>200</td>
                <td>100</td>
                <td>10</td>
                <td>20手</td>
                <td>290</td>
                <td>3美元/手</td>
                <td>400</td>
              </tr>
              <tr>
                <td>800</td>
                <td>200</td>
                <td>20</td>
                <td>40手</td>
                <td>1,380</td>
                <td>3美元/手</td>
                <td>1,600</td>
              </tr>
              <tr>
                <td>2,000</td>
                <td>500</td>
                <td>50</td>
                <td>100手</td>
                <td>3,450</td>
                <td>3美元/手</td>
                <td>4,000</td>
              </tr>
              <tr>
                <td>10,000</td>
                <td>1,500</td>
                <td>100</td>
                <td>300手</td>
                <td>28,400</td>
                <td>3美元/手</td>
                <td>30,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> <br>3.如已完成首笔手数，无论取款或继续领取交易赠金，均不影响已获得的首笔赠金。 <br> <br>4.若客户在获得总赠金之前提取资金，则视为放弃余下未领取的赠金，活动自动结束，已获得的赠金不会被扣除 <br>
      <br>5.若客户已完成要求手数，在活动期间内可凭净值再次申请赠金，交易时间不变，以首次登记后的结束时间为准。 <br> <br>6.交易赠金统计时段为： <br>北京时间每日06:00至次日06:00；
      <br>以平仓手数计算，赠金将于北京时间次日14:00前发放。 <br><br>7.本次活动只适用于XAUUSD Pro &amp; XAGUSD Pro两项现货黄金/白银产品，其余产品交易将不计入活动手数。 <br><br>
      <div><span>额外惊喜礼遇：</span></div>
      <div>（1）活动期间，凡交易满500手，皆可获赠华为Mate 60 Pro 12GB+512GB 手机一部。<br>（2）如实物礼品采购供应链问题，本公司将安排等值兑换赠金，华为Mate 60 Pro 12GB+512GB
        =
        1000美元。<br>（3）客户需联系客服提供收货地址及联系方式，礼品发放会在7个工作日内处理，订单处理及快递时效以商品官方为准。<br>（4）本活动与交易达人赛活动的保底奖品不可重复领取，保底奖品限领1份，以最高达到的层级为准。
      </div>
      <div><span>活动举例：</span></div>
      <div>
        张先生开立巨象金业MT4账户并升级专业投资者，24小时内注资2,000美元后，他于用户中心成功登记申请4,000美元赠金，首笔赠金550美元（首笔赠金500美元+24小时注资加送50美元=550美元）即时添加至MT4账户，完成100手所需手数后，550美元赠金变为可提取，同时3,450美元交易赠金为待领取状态。张先生不取款继续交易，当天交易平仓10手，次日获得30美元赠金（10手*3美元/手）。<br>活动期间，张先生总计完成1,150手所需手数，成功获得满额度4,000美元赠金+华为Mate
        60 Pro 12GB+512GB 手机一部（交易达500手）。</div>
      <div><span>注意事项：</span></div>
      <div>1.交易时间内平仓的交易单，才可算作有效完成手数。</div>
      <div>2.对于首笔赠金，客户若在未完成规定手数前产生取款，赠金将被扣除（扣除时不作特别通知），同时终止此次活动，取消待领取的交易赠金。</div>
      <div>3.客户在完成首笔赠金手数要求后进行取款，则视为放弃待领取的交易赠金。</div>
      <div>4.交易时间结束时，若客户仍未能完成规定的交易手数，则首笔赠金将从客户账户中扣除；若客户账户余额为负值其结果由巨象承担；客户应承担账户交易风险，确保在没有赠金的情况下，账户可用保证金仍然充足。 </div>
      <div>5.每个交易账号只能参加一期新客$30000赠金活动。</div>
      <div>6.若客户在完成交易手数前，账户产生负数结余，如此时账户无持仓单，则视为提前结束活动，账户归零，重新注资后客户无需补偿负数部分。登记时间内，客户可再次注资登记参加当期活动，交易结束时间不变，以首次登记后的结束时间为准。
      </div>
      <div>7.活动期间内现有客户销户重开将不可重复参加。若发现客户存在相同IP地址进行多次注册，公司可视作滥用活动且取消其活动资格。同时，公司保留对客户身份进行考证的权利，若拒绝验证，则视为放弃赠金。 </div>
      <div>8.活动进行中若发现客户通过AB仓交易，超短线刷单等交易行为套取赠金，公司有权停止客户交易，并终止活动并收回赠金。</div>
      <div>9.巨象金业保留随时修改、暂停、终止本活动计划及任何相关规则条款与替换其他等值赠品之权利及其解释权，毋须事前通知客户。</div>
      <div>10.本活动与Apple inc无关。 </div>
    </div>
  </div>
</body>
</html>
`