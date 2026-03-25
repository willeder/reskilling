export type LessonType = 'video' | 'hands-on' | 'work' | 'rep-work' | 'emp-work' | 'test' | 'summary'
export type Target = 'all' | 'rep' | 'emp'

export const lessonTypeLabel: Record<LessonType, string> = {
  video: '動画',
  'hands-on': 'ハンズオン',
  work: 'ワーク',
  'rep-work': '代表ワーク',
  'emp-work': '従業員ワーク',
  test: 'テスト',
  summary: 'まとめ',
}

export const targetLabel: Record<Target, string> = {
  all: '全員',
  rep: '代表',
  emp: '従業員',
}

export interface Lesson {
  no: string
  title: string
  description: string
  type: LessonType
  minutes: number
  target: Target
}

export interface Section {
  id: string
  title: string
  totalMinutes: number
  lessons: Lesson[]
}

export interface Chapter {
  id: number
  title: string
  phase: 'ai' | 'workflow'
  phaseLabel: string
  totalMinutes: number
  lessonCount: number
  goal: string
  sections: Section[]
}

export const courseInfo = {
  title: '業務棚卸から始めるAI・DX活用実践講座',
  target: '企業の代表・従業員（全員）',
  totalMinutes: 857,
  totalHours: '約14.3時間',
  subsidy: '人材開発支援助成金（10時間以上）対応',
  price: '30,000円 / 人',
  chapterCount: 9,
  sectionCount: 18,
  lessonCount: 67,
  aiRatio: 30,
  workflowRatio: 70,
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'AIとは何か・何ができるか',
    phase: 'ai',
    phaseLabel: 'AI基礎フェーズ',
    totalMinutes: 92,
    lessonCount: 10,
    goal: 'AIの基本概念と中小企業での活用イメージを掴み、「自分ごと」として捉えられるようになる',
    sections: [
      {
        id: '1-1',
        title: 'AIの基本を理解する',
        totalMinutes: 37,
        lessons: [
          { no: '1-1-1', title: 'AIって結局何？', description: 'AIの定義・仕組みを図解でわかりやすく解説', type: 'video', minutes: 5, target: 'all' },
          { no: '1-1-2', title: 'ChatGPT・Claudeでできること', description: '代表的AIツールの機能と特徴を比較', type: 'video', minutes: 7, target: 'all' },
          { no: '1-1-3', title: '今すぐ使えるAI活用シーン10選', description: 'メール作成・要約・アイデア出しなど身近な活用例', type: 'video', minutes: 5, target: 'all' },
          { no: '1-1-4', title: 'ハンズオン｜ChatGPTに話しかけてみる', description: '実際にアクセスして3つのタスクを試す', type: 'hands-on', minutes: 15, target: 'all' },
          { no: '1-1-5', title: '確認テスト', description: 'AIの基本概念・ツール名・できることの確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '1-2',
        title: '中小企業でのAI活用事例',
        totalMinutes: 40,
        lessons: [
          { no: '1-2-1', title: '営業・バックオフィスでの活用事例', description: '実際の中小企業がAIで削減した工数と成果', type: 'video', minutes: 8, target: 'all' },
          { no: '1-2-2', title: '製造・サービス業での活用事例', description: '現場作業・接客・品質管理への応用例', type: 'video', minutes: 7, target: 'all' },
          { no: '1-2-3', title: '「AI活用した人」と「しない人」の差', description: '生産性・競争力・採用面でのリアルな差異', type: 'video', minutes: 5, target: 'all' },
          { no: '1-2-4', title: 'まとめ・Chapter1の振り返り', description: '学習内容の整理と次Chapterへの接続', type: 'summary', minutes: 15, target: 'all' },
          { no: '1-2-5', title: '確認テスト', description: '活用事例・業種別用途の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'AIツールを使ってみる（ハンズオン）',
    phase: 'ai',
    phaseLabel: 'AI基礎フェーズ',
    totalMinutes: 105,
    lessonCount: 10,
    goal: '実際にAIツールを操作し、業務で使えるプロンプトの基本を習得する',
    sections: [
      {
        id: '2-1',
        title: 'まず触ってみる',
        totalMinutes: 38,
        lessons: [
          { no: '2-1-1', title: 'ChatGPTの基本操作ガイド', description: '画面の見方・会話の始め方・履歴の使い方', type: 'video', minutes: 5, target: 'all' },
          { no: '2-1-2', title: 'ハンズオン｜業務メールをAIで書く', description: '実際の業務メール3種類をAIで作成する実習', type: 'hands-on', minutes: 20, target: 'all' },
          { no: '2-1-3', title: 'ハンズオン｜議事録・要約を作る', description: '音声・テキストからAIで議事録を自動生成', type: 'hands-on', minutes: 8, target: 'all' },
          { no: '2-1-4', title: '確認テスト', description: '基本操作・使い方の確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '2-2',
        title: 'プロンプトの基本を学ぶ',
        totalMinutes: 60,
        lessons: [
          { no: '2-2-1', title: '指示の出し方で結果が変わる', description: '同じ質問でも表現次第でAIの回答が大きく変わる', type: 'video', minutes: 5, target: 'all' },
          { no: '2-2-2', title: 'よいプロンプト・悪いプロンプトの比較', description: '具体例で学ぶプロンプトの改善ポイント', type: 'video', minutes: 7, target: 'all' },
          { no: '2-2-3', title: '役割・制約・出力形式を指定する', description: 'AIをより精度高く使うための3つの指定方法', type: 'video', minutes: 8, target: 'all' },
          { no: '2-2-4', title: 'ハンズオン｜プロンプトを改善してみる', description: '悪いプロンプトを改善して結果の差を確認する実習', type: 'hands-on', minutes: 20, target: 'all' },
          { no: '2-2-5', title: 'まとめ・Chapter2の振り返り', description: '学習内容の整理と次Chapterへの接続', type: 'summary', minutes: 15, target: 'all' },
          { no: '2-2-6', title: '確認テスト', description: 'プロンプト設計の基本確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'AI・DX化が失敗する理由と成功の設計',
    phase: 'ai',
    phaseLabel: 'AI基礎フェーズ',
    totalMinutes: 95,
    lessonCount: 10,
    goal: 'AI・DX化が失敗する4つのレイヤーを理解し、「設計」こそが成功の鍵であることを腹落ちさせる',
    sections: [
      {
        id: '3-1',
        title: 'AI・DX化が失敗する4つのレイヤー',
        totalMinutes: 40,
        lessons: [
          { no: '3-1-1', title: '失敗は「ツール」ではなく「レイヤー」で起きる', description: '戦略・業務設計・組織・教育の4レイヤーで失敗が起きるメカニズムを解説', type: 'video', minutes: 7, target: 'all' },
          { no: '3-1-2', title: '「AIを入れたのに変わらない」よくある失敗パターン4選', description: 'ツール導入で満足・一人だけ使用・自動化未定義・業務フロー未見直しの4パターンを解説', type: 'video', minutes: 5, target: 'all' },
          { no: '3-1-3', title: '業務が本当に変わるために必要な3つのこと', description: '業務の棚卸し・自社専用の設計・チームへの展開定着の3ステップを解説', type: 'video', minutes: 8, target: 'all' },
          { no: '3-1-4', title: 'ワーク｜自社の失敗レイヤーを4軸で診断する', description: '戦略・業務設計・組織・教育の4レイヤーで自社の現状をセルフ診断', type: 'work', minutes: 15, target: 'all' },
          { no: '3-1-5', title: '確認テスト', description: '4レイヤー・失敗パターン・3つの必要条件の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '3-2',
        title: '成功の設計：ツールより「設計」が大事な理由',
        totalMinutes: 40,
        lessons: [
          { no: '3-2-1', title: 'ツールは同じでも「設計」が違う―成功企業の共通点', description: '同じツールでも「業務設計」の有無で成果が大きく変わる事例を紹介', type: 'video', minutes: 8, target: 'all' },
          { no: '3-2-2', title: '「時間を買う」感覚―AIは最速の設備投資', description: '「最初の設計さえ正しければ、あとは勝手に回る」ROI発想の転換', type: 'video', minutes: 5, target: 'all' },
          { no: '3-2-3', title: '「知っている」から「使いこなせる」企業へ（全体マップ）', description: 'Chapter4〜9の棚卸しフェーズ全体の流れとAI活用定着のロードマップ', type: 'video', minutes: 7, target: 'all' },
          { no: '3-2-4', title: 'まとめ・Chapter3の振り返り', description: '設計フェーズの総まとめと業務棚卸しフェーズへの橋渡し', type: 'summary', minutes: 15, target: 'all' },
          { no: '3-2-5', title: '確認テスト', description: '設計の重要性・成功要因・コース全体像の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: '業務を洗い出す',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 90,
    lessonCount: 8,
    goal: '自社・自部門の業務を漏れなく書き出し、「見えていなかった業務」を発見する',
    sections: [
      {
        id: '4-1',
        title: '洗い出しの考え方と方法',
        totalMinutes: 25,
        lessons: [
          { no: '4-1-1', title: 'なぜ業務の棚卸しができないのか', description: '客観的な分解ができない本質的な理由と解決策', type: 'video', minutes: 7, target: 'all' },
          { no: '4-1-2', title: '粒度のそろえ方（ちょうどいい粒度とは）', description: '粗すぎず・細かすぎない業務分解の基準', type: 'video', minutes: 5, target: 'all' },
          { no: '4-1-3', title: '属人化の見つけ方', description: '「自分しかできない業務」を正しく認識するチェック方法', type: 'video', minutes: 8, target: 'all' },
          { no: '4-1-4', title: '確認テスト', description: '洗い出し手法・粒度基準の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '4-2',
        title: 'ロール別ワーク①：業務を書き出す',
        totalMinutes: 50,
        lessons: [
          { no: '4-2-1', title: 'ワークシートの使い方ガイド', description: '記入項目・記入方法・提出方法の説明', type: 'video', minutes: 5, target: 'all' },
          { no: '4-2-2', title: '代表ワーク｜会社全体の業務を書き出す', description: '部門別・機能別に全社業務を20項目以上リストアップ', type: 'rep-work', minutes: 20, target: 'rep' },
          { no: '4-2-3', title: '従業員ワーク｜担当業務を書き出す', description: '自分の1週間分の業務を10項目以上リストアップ', type: 'emp-work', minutes: 20, target: 'emp' },
          { no: '4-2-4', title: 'ワーク提出・確認テスト', description: 'ワーク提出 ＋ 洗い出し完了確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: '業務を数値で表す',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 90,
    lessonCount: 8,
    goal: '業務の重要度・頻度・所要時間を定量化し、「感覚」ではなく「データ」で業務を把握する',
    sections: [
      {
        id: '5-1',
        title: '数値化の考え方と方法',
        totalMinutes: 25,
        lessons: [
          { no: '5-1-1', title: 'なぜ「感覚」ではダメなのか', description: '体感時間と実測時間のズレを事例で確認', type: 'video', minutes: 5, target: 'all' },
          { no: '5-1-2', title: '業務時間の正しい測り方（ストップウォッチ法）', description: 'タイマー計測・日次記録・週次集計の3ステップ', type: 'video', minutes: 7, target: 'all' },
          { no: '5-1-3', title: '重要度・頻度・難易度・属人度のスコアリング', description: '各指標の定義と1〜5点スコアの判定基準', type: 'video', minutes: 8, target: 'all' },
          { no: '5-1-4', title: '確認テスト', description: '数値化手法・スコアリング基準の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '5-2',
        title: 'ロール別ワーク②：数値を入力する',
        totalMinutes: 50,
        lessons: [
          { no: '5-2-1', title: '数値入力ガイド', description: 'ワークシートの数値項目の記入方法と注意点', type: 'video', minutes: 5, target: 'all' },
          { no: '5-2-2', title: '代表ワーク｜重要度・繰り返しスコアを記入', description: '全社業務に重要度・戦略的位置づけ・繰り返し頻度を入力', type: 'rep-work', minutes: 20, target: 'rep' },
          { no: '5-2-3', title: '従業員ワーク｜業務時間・難易度・属人度を記入', description: '各業務の実測時間・難易度スコア・属人度スコアを入力', type: 'emp-work', minutes: 20, target: 'emp' },
          { no: '5-2-4', title: 'ワーク提出・確認テスト', description: 'ワーク提出 ＋ 数値化完了確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: '業務を分類・整理する',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 90,
    lessonCount: 8,
    goal: '洗い出した業務を構造的に分類し、AI化・マニュアル化・外注化の候補を特定できる',
    sections: [
      {
        id: '6-1',
        title: '4象限マトリクスで業務を整理する',
        totalMinutes: 25,
        lessons: [
          { no: '6-1-1', title: '4象限マトリクスとは', description: '定型×高頻度・定型×低頻度・非定型×高頻度・非定型×低頻度の4分類', type: 'video', minutes: 7, target: 'all' },
          { no: '6-1-2', title: 'AIに任せていい業務・人がやるべき業務', description: '4象限ごとの最適な対処法（AI化・マニュアル化・専門家判断）', type: 'video', minutes: 8, target: 'all' },
          { no: '6-1-3', title: '重複業務・無駄業務の発見方法', description: 'なんとなく続いている業務を見つける3つの問い', type: 'video', minutes: 5, target: 'all' },
          { no: '6-1-4', title: '確認テスト', description: '4象限の分類基準・活用方針の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '6-2',
        title: 'ロール別ワーク③：業務を分類する',
        totalMinutes: 50,
        lessons: [
          { no: '6-2-1', title: '分類ガイド', description: 'ワークシートの分類記入方法と迷った時の判断基準', type: 'video', minutes: 5, target: 'all' },
          { no: '6-2-2', title: '代表ワーク｜全社視点での業務分類', description: '全社業務を4象限に分類し、AI化優先順位をつける', type: 'rep-work', minutes: 20, target: 'rep' },
          { no: '6-2-3', title: '従業員ワーク｜自分の業務分類＋属人化チェック', description: '担当業務を4象限に分類し、属人化している業務をマーク', type: 'emp-work', minutes: 20, target: 'emp' },
          { no: '6-2-4', title: 'ワーク提出・確認テスト', description: 'ワーク提出 ＋ 分類完了確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 7,
    title: '代表と従業員のギャップを見る',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 95,
    lessonCount: 8,
    goal: '代表と従業員のワーク結果を比較し、認識のズレと全社の業務課題を可視化する',
    sections: [
      {
        id: '7-1',
        title: 'ギャップ分析の読み方',
        totalMinutes: 25,
        lessons: [
          { no: '7-1-1', title: 'なぜ代表と従業員でズレが生まれるのか', description: '視点の違い・情報の非対称性・評価基準の差', type: 'video', minutes: 7, target: 'all' },
          { no: '7-1-2', title: 'ギャップが見えると何が変わるか', description: 'ギャップ解消がチームの生産性・信頼関係に与える影響', type: 'video', minutes: 5, target: 'all' },
          { no: '7-1-3', title: 'ギャップ分析の4つのパターン', description: '時間ズレ・重要度ズレ・役割ズレ・属人化ズレの分類と対処', type: 'video', minutes: 8, target: 'all' },
          { no: '7-1-4', title: '確認テスト', description: 'ギャップ分析の意義・パターンの確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '7-2',
        title: '全社業務マップを完成させる',
        totalMinutes: 48,
        lessons: [
          { no: '7-2-1', title: '全社業務マップの作り方', description: '代表・従業員のワークを統合して1枚の全社マップを作る方法', type: 'video', minutes: 8, target: 'all' },
          { no: '7-2-2', title: 'ワーク｜ギャップポイントを特定する', description: '両者のワークを見比べて、ズレが大きい業務を3つ選ぶ', type: 'work', minutes: 20, target: 'all' },
          { no: '7-2-3', title: 'まとめ・Chapter7の振り返り', description: '全社業務マップの意味と次Chapterへの接続', type: 'summary', minutes: 15, target: 'all' },
          { no: '7-2-4', title: '確認テスト', description: '全社マップ・ギャップ特定の確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'AI活用ポイントを特定する',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 90,
    lessonCount: 8,
    goal: '棚卸し結果をもとに、自社でAIを活用すべき業務・場所を具体的に特定できる',
    sections: [
      {
        id: '8-1',
        title: '棚卸し結果とAIをつなぐ',
        totalMinutes: 25,
        lessons: [
          { no: '8-1-1', title: '棚卸しデータからAI候補業務を見つける方法', description: 'スコア×頻度×時間の組み合わせでAI化優先順位を決める', type: 'video', minutes: 7, target: 'all' },
          { no: '8-1-2', title: '業務×AIツールのマッチング早見表', description: '業務カテゴリ別おすすめAIツール20選の解説', type: 'video', minutes: 8, target: 'all' },
          { no: '8-1-3', title: 'AI化した場合の時間削減試算の方法', description: '月間削減時間・コスト削減額の簡易計算方法', type: 'video', minutes: 5, target: 'all' },
          { no: '8-1-4', title: '確認テスト', description: 'AI候補特定・ツールマッチング・試算方法の確認（5問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '8-2',
        title: 'ロール別ワーク④：AI活用候補を特定する',
        totalMinutes: 50,
        lessons: [
          { no: '8-2-1', title: 'AI活用候補特定ガイド', description: 'ワークシートの記入方法と試算シートの使い方', type: 'video', minutes: 5, target: 'all' },
          { no: '8-2-2', title: '代表ワーク｜全社AI化ロードマップを描く', description: '優先度順にAI化業務を並べ、導入コスト・ROIを試算', type: 'rep-work', minutes: 20, target: 'rep' },
          { no: '8-2-3', title: '従業員ワーク｜自分の業務でAIを使う場面を特定', description: '担当業務の中からAIで代替できる作業を選び、使い方を記述', type: 'emp-work', minutes: 20, target: 'emp' },
          { no: '8-2-4', title: 'ワーク提出・確認テスト', description: 'ワーク提出 ＋ AI候補特定完了確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
  {
    id: 9,
    title: '最終レポートを生成する',
    phase: 'workflow',
    phaseLabel: '業務棚卸しフェーズ',
    totalMinutes: 110,
    lessonCount: 11,
    goal: 'これまでのワークを集約し、AIプロンプトを使って「自社専用のAI活用レポート」を生成する',
    sections: [
      {
        id: '9-1',
        title: 'レポート生成の準備',
        totalMinutes: 40,
        lessons: [
          { no: '9-1-1', title: 'レポートで何がわかるか', description: '業務改善ポイント・おすすめAIツール・ROI試算・次のステップの4構成', type: 'video', minutes: 5, target: 'all' },
          { no: '9-1-2', title: 'これまでのワークを確認する', description: 'Chapter4〜8のワークシートを見直し、入力漏れをチェック', type: 'work', minutes: 8, target: 'all' },
          { no: '9-1-3', title: 'レポート用プロンプトの使い方', description: '専用プロンプトへのデータ入力方法と出力の読み方', type: 'video', minutes: 7, target: 'all' },
          { no: '9-1-4', title: 'ハンズオン｜プロンプトにデータを入力する', description: 'ワークシートのデータをプロンプトに貼り付けて実行する', type: 'hands-on', minutes: 15, target: 'all' },
          { no: '9-1-5', title: '確認テスト', description: 'プロンプト使用方法・レポート構成の確認（3問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
      {
        id: '9-2',
        title: 'レポート生成・読み解き・次のステップ',
        totalMinutes: 60,
        lessons: [
          { no: '9-2-1', title: 'AI出力｜業務改善ポイントを読む', description: 'レポートの「業務改善ポイント」セクションの読み解き方', type: 'video', minutes: 10, target: 'all' },
          { no: '9-2-2', title: 'AI出力｜おすすめAIツール・活用方法を確認', description: '自社に提案されたAIツールの導入優先順位の判断方法', type: 'video', minutes: 8, target: 'all' },
          { no: '9-2-3', title: 'AI出力｜削減できる時間・コストを確認', description: 'ROI試算結果の見方と経営判断への活かし方', type: 'video', minutes: 7, target: 'all' },
          { no: '9-2-4', title: '次のステップ｜エージェンティックワークフローとは', description: 'さらに一歩先へ：AIが自律的に業務を処理する仕組みの紹介', type: 'video', minutes: 10, target: 'all' },
          { no: '9-2-5', title: 'コース修了・最終まとめ', description: 'コース全体の振り返り・修了証・次回アクション', type: 'summary', minutes: 20, target: 'all' },
          { no: '9-2-6', title: '最終テスト', description: 'コース全体の理解度確認（10問）', type: 'test', minutes: 5, target: 'all' },
        ],
      },
    ],
  },
]

// For admin/mypage demo
export const students = [
  { name: "佐々木 光", email: "m.sasaki@corp.co.jp", dept: "営業部", progress: 85, chapters: 8, status: "受講中" },
  { name: "伊藤 真理", email: "m.ito@corp.co.jp", dept: "マーケ部", progress: 100, chapters: 9, status: "修了" },
  { name: "渡辺 隆", email: "t.watanabe@corp.co.jp", dept: "総務部", progress: 42, chapters: 4, status: "受講中" },
  { name: "高橋 美咲", email: "m.takahashi@corp.co.jp", dept: "開発部", progress: 0, chapters: 0, status: "未開始" },
  { name: "中島 剛", email: "t.nakajima@corp.co.jp", dept: "営業部", progress: 68, chapters: 6, status: "受講中" },
]

export const qaItems = [
  { user: "田村 英二", initial: "田", color: "#3B82F6", time: "2時間前", question: "Chapter4のワークシートで業務粒度の判断に迷っています。「メール対応」は1つの業務として書くべきですか？", answered: true, answer: "「メール対応」はさらに分解することをお勧めします。「社内連絡メール」「顧客問い合わせ対応」「見積もり回答」のように、内容ごとに分けると数値化やAI化判断がしやすくなります。", answerBy: "講師" },
  { user: "山口 由紀", initial: "山", color: "#8B5CF6", time: "1日前", question: "ハンズオンで使うChatGPTは有料プランが必要ですか？無料プランでも実習は可能でしょうか？", answered: false },
  { user: "木村 誠", initial: "木", color: "#10B981", time: "2日前", question: "修了証は社内の資格取得制度に使えますか？発行フォーマットを教えてください。", answered: true, answer: "はい、PDF形式で発行されます。社内規定に従って申請してください。詳細はサポートページをご確認ください。", answerBy: "運営事務局" },
]

export const testQuestions = [
  {
    q: "AI・DX化が失敗する「4レイヤー」のうち、最も根本的な原因とされているのはどれですか？",
    options: ["適切なAIツールを選んでいない", "戦略・業務設計レイヤーの問題", "社員のITリテラシーが低い", "予算が不足している"],
    correct: 1,
  },
  {
    q: "業務棚卸しで「ちょうどいい粒度」の判断基準として正しいものはどれですか？",
    options: ["できるだけ細かく分解する", "担当者が1人で完結する単位", "AIで代替できる単位かどうか", "1タスク15分以内に収まる単位"],
    correct: 2,
  },
]
