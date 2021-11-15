import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { PageTitle } from '../../components/heading'

/* Content - 服務條款整個內容區塊 */
const Content = styled.div``

/* Paragraph - 段落 */
const Paragraph = styled.div`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.5px;
`

/* Lists - 第一層列表 */
const Lists = styled.ul`
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* SubLists - 第二層列表 */
const SubLists = styled.ul`
  margin-left: 32px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`

/* ListItem - 每一條列表的內容 */
const ListItem = styled.li`
  margin-top: 10px;
`

export default function TermsPage() {
  return (
    <Container>
      {/* 標題 */}
      <PageTitle>Trade On 服務條款</PageTitle>

      {/* 服務條款整個內容區塊 */}
      <Content>
        <Paragraph>
          歡迎你加入成為 Trade On 會員 (以下稱會員服務)， 本會員服務係由 Trade
          On 股份有限公司 (以下稱本服務) 建置提供，所有申請使用會員服務之使用者
          (以下稱會員)，都應該詳細閱讀下列使用條款，這些使用條款訂立的目的，是為了保護會員服務的提供者以及所有使用者的利益，並構成使用者與會員服務提供者之間的契約。
          使用者完成註冊手續、或開始使用本會員服務時，即視為已知悉、並完全同意本使用條款的所有約定
        </Paragraph>
        <Paragraph>一、 使用規則 </Paragraph>
        <Paragraph>
          歡迎來到「Trade On」。在瀏覽「Trade On」的同時，您同意遵守下列條款。
          我們制訂以下條款的目的是為了確保「Trade
          On」可以為所有人服務，請勿從事任何不良活動，包括但不限於以下：
        </Paragraph>
        <Lists>
          <ListItem>1.違反任何法律或我們的禁止性內容規定</ListItem>
          <ListItem>2. 內容不實或有誤導性</ListItem>
          <ListItem>3. 侵犯任何第三方權利</ListItem>
          <ListItem>4. 傳播或發佈包含有垃圾郵件、連鎖信的資訊</ListItem>
          <ListItem>
            5. 傳播病毒或其他任何可能損害「Trade On」或「Trade
            On」用戶利益或財產的技術，對「Trade
            On」的內部構造施加不合理的負荷或妨礙「Trade On」的正常運行
          </ListItem>
          <ListItem>6. 複製、修改、或傳播他人的內容</ListItem>
          <ListItem>
            7. 未經他人同意而獲取或收集其資訊，包括電子郵件位址等
          </ListItem>
        </Lists>
        <Paragraph>
          與 Trade On
          客服聯繫，如對話內容中含有個人情緒性字句、威脅誹謗意味、令人感到不悅或恐懼的、不具建設性的批評、無具體事證之惡意攻訐辱罵之字句、影像等，得不予以回應。
          任一刊登（圖片、文字、影音、連結等包括但不限於上述的內容）或互動行為造成他人觀感不佳或其行動違反了我們規定的內容或精神，本網站保有逕行認定會員干擾或影響本網站運作或營運之決定權限，得不附理由刪除內容、停權或取消會員資格，並採取技術和法律手段使得該用戶離開「Trade
          On」。
        </Paragraph>
        <Paragraph>二、 禁止性內容規定</Paragraph>
        <Paragraph> 所有的發佈內容不得包含下述的任一資訊：</Paragraph>
        <Lists>
          <ListItem>
            1. 煽動抵抗或違反中華民國憲法、法律或行政法規執行的
          </ListItem>
          <ListItem>2. 煽動族群仇恨、族群歧視，破壞族群團結的</ListItem>
          <ListItem>3. 製造謊言或歪曲事實、散佈謠言、破壞社會秩序的</ListItem>
          <ListItem>
            4. 宣揚封建迷信、傳播有性挑逗性質的材料、賭博、暴力或兇殺的
          </ListItem>
          <ListItem>
            5. 宣揚恐怖主義或唆使他人犯罪；公開侮辱他人或歪曲事實誹謗他人的
          </ListItem>
          <ListItem>6. 損害國家機關聲譽的</ListItem>
          <ListItem>
            7. 其他違反中華民國憲法、法律和行政法規的內容 不可出現在本站的物品：
          </ListItem>
        </Lists>
        <SubLists>
          <ListItem>1. 血液、體液（母乳除外）和人體器官</ListItem>
          <ListItem>2. 假冒或非法製造的產品</ListItem>
          <ListItem>3. 火藥、破壞性設備和爆炸性物質</ListItem>
          <ListItem>
            4. 任何形式的身份證明檔、個人財務記錄以及個人資訊（包括郵件列表）
          </ListItem>
          <ListItem>5. 淫穢物品和兒童色情物品</ListItem>
          <ListItem>6. 令人反感的內容</ListItem>
          <ListItem>7. 有違善良風俗之內容</ListItem>
          <ListItem>8. 使用任何非法手段取得之物品，例如偷竊、強盜等</ListItem>
          <ListItem>
            9. 酒類：包括樣品酒、水果氣泡酒、紀念酒、料理米酒等
          </ListItem>
          <ListItem>
            10. 菸及外觀印有菸品品牌之物品：任何菸品（
            包含一般香煙、雪茄、提供電子煙抽食之液體
            ）、物品中含有香煙品牌標誌或人物抽煙意象圖形（ 例如：T
            恤上印有正在抽煙圖像 ){' '}
          </ListItem>
          <ListItem>
            11. 任何菸酒類包括並不限於上述品項，皆不可在平台上贈送
          </ListItem>
          <ListItem>
            12.
            毒品、藥品、贓物、武器、警用武器、保育動物製品、二手內衣褲、煙火爆竹，教導鼓勵他人自殺之物、侵權物品、依法禁止贈與之物品等
          </ListItem>
          <ListItem>13. 宣稱療效之藥品、健康食品、補品等</ListItem>
          <ListItem>14. 有任何危害的食品或食品添加物</ListItem>
        </SubLists>
        <Paragraph>三、 免責聲明</Paragraph>
        <Lists>
          <ListItem>
            1.
            刊登受騙、委屈、申訴、抱怨等相關訊息時，應詳細發佈本身事實的遭遇過程，不應只有道聽塗說
          </ListItem>
          <ListItem>2. 請勿發佈非事實的言論</ListItem>
          <ListItem>3. 請勿惡意詆毀他人聲譽或商譽</ListItem>
          <ListItem>
            4. 「Trade
            On」上所發佈的內容，請純作參考用途，且訊息的內容為網友自行刊登，所有訊息本站不做任何擔保也不代表本站立場。
          </ListItem>
          <ListItem>
            5. 「Trade On」只負責互動平台的提供。有些資訊未必是真實的，
          </ListItem>
          <ListItem>
            6. 「Trade On」無法逐一篩選與驗證，請瀏覽者自行判斷。
          </ListItem>
        </Lists>
        <Paragraph>
          如有惡意以言論攻擊他人名譽或商譽或者利用本站從事不合法交易及詐騙行為，請受害人先依照正常程序報請檢調相關單位，「Trade
          On」將盡力提供不法網友相關資料與來源配合檢調相關單位偵辦。
        </Paragraph>
        <Paragraph>
          對於會員不依分類去發佈，「Trade
          On」擁有完全的權利可以不經發佈者同意去刪除或搬移，但不會修改部分內容。利用會員身份未依本站相關規定而時常胡亂發佈訊息，影響本站運作者與網友的閱讀，將予以時間性或永久性的停權處份。
        </Paragraph>
        <Paragraph>四、用戶責任</Paragraph>
        <Paragraph>
          使用者應自行承擔責任使用本服務，對於在本站所從事的所有行為及其結果應自行負擔一切責任。起因於用戶使用本服務（包括本站自第三人處收到原因為該等使用的申訴），致本站直接或間接蒙受任何損害（包括律師費用的負擔）時，用戶應依照本站要求立即給予補償。
        </Paragraph>
        <Paragraph>
          Trade On
          站上的物品是由贈與之會員（以下稱贈送者）無報酬的提供給索取之會員（以下合稱索取者），Trade
          On
          並不參與或干涉贈送者及索取者之贈送／索取行為，贈送者及索取者間之法律關係，應由其自行適用民法關於贈與之規定。Trade
          On
          對於贈送者及索取者彼此間之聯繫、贈送等行為並無合約或其他法律關係，也不對贈與物品或贈送行為承擔任何責任。贈與之物品若為食品，贈送或索取之會員將均應盡己所能審查該食品之安全性，並為個人贈送、索取及取用食品的行為負責，自行判斷是否提供贈送或接受取用，並應考慮承購合適之個人責任保險和人身意外傷害保險。
        </Paragraph>
        <Paragraph>
          針對贈送者提供之贈與物品，Trade On
          不對其品質或合法性為任何保證，對於易腐壞的食品，贈送者應於運送時選擇最適宜之保存方式，索取者則應審慎判斷是否取用，且贈送者及索取者均應自行承擔包含但不限於贈與之食品是否仍然適宜供人食用、取用、分享該食品可能影響等相關決定或後果的全部責任。
          贈送者及索取者同意對其所贈與、取用食品之行為自負全部法律責任，且不會就該等食品及食用後果對
          Trade On 及其協力營運商、物流商等提出任何索賠或主張，並在此聲明包含
          Trade On
          在內之所有運送該食品的參與者，均可無條件免除對於運送標的物的安全性、合適性及與健康、衛生及可食性等因素及與前開因素有關的任何損害、索賠或求償之法律與道德責任。
        </Paragraph>
        <Paragraph>五、 一般條款</Paragraph>
        <Lists>
          <ListItem>
            1.「Trade On」之會員通過完成註冊程序，即表示使用者與「Trade
            On」達成協定並接受所有的使用者條款。
          </ListItem>
          <ListItem>
            2.「Trade
            On」會不定時更新本條款（包含使用規則、免責聲明、隱私權保護政策等）之內容。得在不事先通知使用者的情形下隨時變更本使用者條款。變更後的本條款一經公布在網站內的適當處，等同立即生效。如使用者於本條款變更後仍繼續使用服務，將視為使用者已有效且不可撤銷地同意變更後的使用者條款。
          </ListItem>
        </Lists>
        <Paragraph>六、終止授權</Paragraph>
        <Paragraph>
          會員使用本服務之行為若有任何違反法令或本使用條款或危害本公司或第三者權益之虞時，本公司有權不經告知會員，立即暫時或永久終止會員使用本服務之授權。
        </Paragraph>
        <Paragraph>七、修改權</Paragraph>
        <Lists>
          <ListItem>
            1.
            當使用者開始使用本服務時，即表示已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員。如於本條款修改與變更後仍繼續使用本服務，則視為已閱讀、瞭解與同意接受本條款修改或變更。
          </ListItem>
          <ListItem>
            2. 本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。
          </ListItem>
          <ListItem>
            3.
            本公司有權暫時或永久修改或中止提供本服務給會員，會員不得因此要求任何賠償。
          </ListItem>
        </Lists>
        <Paragraph>八、其他規定</Paragraph>
        <Lists>
          <ListItem>
            1. 本網站使用者條約，免責之內容，亦構成本使用條款之一部分。
          </ListItem>
          <ListItem>2. 如違反法令將主動交給執法機關處理。</ListItem>
          <ListItem>
            3.
            若因使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。
          </ListItem>
        </Lists>
        <Paragraph>九、管轄法院</Paragraph>
        <Paragraph>
          使用者與本站間所發生起因於本服務或與本服務有關連的紛爭，如有訴訟之必要時，以台灣台北地方法院為第一審管轄法院。
        </Paragraph>
      </Content>
    </Container>
  )
}
