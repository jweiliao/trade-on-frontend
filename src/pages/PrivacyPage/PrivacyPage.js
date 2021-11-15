import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'

/* Block - 區塊 */
const Block = styled.div`
  margin-bottom: 40px;
`

/* Paragraph - 段落 */
const Paragraph = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.5px;
`

export default function PrivacyPage() {
  return (
    <Container>
      {/* 標題 */}
      <PageTitle>Trade On 隱私權政策</PageTitle>
      <Block>
        <Paragraph>
          歡迎使用「Trade On
          服務平台」。為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
        </Paragraph>
      </Block>
      <Block>
        <Paragraph>一、資料的蒐集、處理及使用方式</Paragraph>
        <Paragraph>
          當您使用「Trade
          On」所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料。
        </Paragraph>
        <Paragraph>
          例如，當您在站上進行「送禮物」或「索取」的動作時，您必須提供姓名、電話及其他與寄送、收件相關的資訊給另一位會員，此時相關訊息將透過平台功能來記錄、轉達，以確保交易流程順暢；非經您的同意，本網站不會將個人資料用於其他用途。
        </Paragraph>
        <Paragraph>
          於一般瀏覽時，伺服器會自行記錄相關線上行為及資訊，包括您使用連線設備的
          IP
          位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，作為我們改進網站服務之參考依據，此紀錄僅供內部使用，絕不對外公佈。
        </Paragraph>
      </Block>
      <Block>
        <Paragraph>
          二、當您瀏覽或使用提供之服務，即表示您同意蒐集、使用與轉載您提供的個人資訊。
        </Paragraph>
      </Block>
      <Block>
        <Paragraph>三、網站對外的第三方連結</Paragraph>
        <Paragraph>
          在「Trade
          On」所發佈的各類資訊中，如有連結出本站以外的網頁，均未在「Trade
          On」的安全管理內，您可不必理會該連結，如要點擊該連結即離開「Trade
          On」的責任範圍外，您必須自行負擔所有可能遇到的問題。本站對您所登入或留存之個人及其相關資料，會善盡保管之責，不會任意將會員資料交予第三者。若於登入或傳輸資料過程中遭他人截取、盜用於其他用途而遭致損失，本站將不負任何責任。
        </Paragraph>
      </Block>
      <Block>
        <Paragraph>四、Cookie 之使用</Paragraph>
        <Paragraph>
          為了提供您最佳的服務，「Trade On」會在您的電腦中放置並取用我們的
          Cookie，若您不願接受 Cookie
          的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕
          Cookie 的寫入，但可能會導致網站某些功能無法正常執行。
        </Paragraph>
      </Block>
      <Block>
        <Paragraph> 五、隱私權保護政策之修正 </Paragraph>
        <Paragraph>
          「Trade
          On」隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
          隱私權政策如經修改，「Trade
          On」將以您所提供之電子郵件或簡訊通知您相關之重大變更，並於「Trade
          On」公告。我們希望您仔細查看更改細節，若您同意更改項目，請繼續使用服務；但若您不同意任何更改項目，且您打算不再使用我們的服務，請停止繼續使用「Trade
          On」服務，並依本隱私權政策規定通知本公司停止蒐集、處理及利用您的個人資料。在向您發出變更通知或在我們的服務中公佈變更通知後，若您繼續使用我們的服務，則視為您接受變更，並同意修改後的隱私權政策。
        </Paragraph>
      </Block>
    </Container>
  )
}
