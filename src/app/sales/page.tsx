import fs from 'fs'
import path from 'path'
import DateRangeFilter from './DateRangeFilter'

interface SaleRow {
  date: string
  category: string
  product: string
  quantity: number
  unit_price: number
  revenue: number
}

interface CategorySummary {
  category: string
  totalRevenue: number
  totalQuantity: number
  transactionCount: number
  avgOrderValue: number
}

interface MonthlyData {
  [month: string]: { [category: string]: number }
}

function parseCsv(content: string): SaleRow[] {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',')
  return lines.slice(1).map(line => {
    const values = line.split(',')
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h.trim()] = values[i]?.trim() ?? '' })
    return {
      date: row.date,
      category: row.category,
      product: row.product,
      quantity: parseInt(row.quantity, 10),
      unit_price: parseInt(row.unit_price, 10),
      revenue: parseInt(row.revenue, 10),
    }
  })
}

function formatCurrency(value: number): string {
  return '¥' + value.toLocaleString('ja-JP')
}

const CATEGORY_COLORS: Record<string, string> = {
  'Electronics': '#9176FF',
  'Clothing': '#36b9cc',
  'Food & Beverage': '#1cc88a',
  'Books': '#f6c23e',
  'Sports': '#e74a3b',
}

interface PageProps {
  searchParams: { from?: string; to?: string }
}

export default function SalesPage({ searchParams }: PageProps) {
  const csvPath = path.join(process.cwd(), 'public', 'sample_data', 'sales.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const allRows = parseCsv(csvContent)

  // Determine full data range
  const allMonths = Array.from(new Set(allRows.map(r => r.date.slice(0, 7)))).sort()
  const minMonth = allMonths[0]
  const maxMonth = allMonths[allMonths.length - 1]

  // Apply filter
  const fromMonth = searchParams.from && searchParams.from >= minMonth ? searchParams.from : minMonth
  const toMonth = searchParams.to && searchParams.to <= maxMonth ? searchParams.to : maxMonth

  const rows = allRows.filter(row => {
    const month = row.date.slice(0, 7)
    return month >= fromMonth && month <= toMonth
  })

  // Aggregate by category
  const categoryMap: Record<string, CategorySummary> = {}
  for (const row of rows) {
    if (!categoryMap[row.category]) {
      categoryMap[row.category] = {
        category: row.category,
        totalRevenue: 0,
        totalQuantity: 0,
        transactionCount: 0,
        avgOrderValue: 0,
      }
    }
    categoryMap[row.category].totalRevenue += row.revenue
    categoryMap[row.category].totalQuantity += row.quantity
    categoryMap[row.category].transactionCount += 1
  }
  const categories = Object.values(categoryMap).map(c => ({
    ...c,
    avgOrderValue: Math.round(c.totalRevenue / c.transactionCount),
  })).sort((a, b) => b.totalRevenue - a.totalRevenue)

  const totalRevenue = categories.reduce((sum, c) => sum + c.totalRevenue, 0)
  const maxRevenue = categories[0]?.totalRevenue ?? 1

  // Monthly revenue by category
  const monthlyData: MonthlyData = {}
  const allCategories = categories.map(c => c.category)
  for (const row of rows) {
    const month = row.date.slice(0, 7)
    if (!monthlyData[month]) {
      monthlyData[month] = {}
      allCategories.forEach(cat => { monthlyData[month][cat] = 0 })
    }
    monthlyData[month][row.category] = (monthlyData[month][row.category] ?? 0) + row.revenue
  }
  const months = Object.keys(monthlyData).sort()

  const isFiltered = fromMonth !== minMonth || toMonth !== maxMonth

  return (
    <main>
      <div className="header">
        <img src="/xata-logo.svg" alt="Xata" />
        <h1>Sales Analysis</h1>
      </div>
      <p className="subtitle">
        商品カテゴリ別売上分析
        {isFiltered
          ? ` — ${fromMonth} 〜 ${toMonth} の ${rows.length} 件`
          : ` — 全期間 ${rows.length} 件のトランザクション`}
      </p>

      <div className="divider" />

      {/* Date Range Filter */}
      <DateRangeFilter
        minMonth={minMonth}
        maxMonth={maxMonth}
        currentFrom={fromMonth}
        currentTo={toMonth}
      />

      {rows.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '3rem' }}>
          指定した期間にデータがありません
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">総売上</div>
              <div className="kpi-value">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">カテゴリ数</div>
              <div className="kpi-value">{categories.length}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">取引件数</div>
              <div className="kpi-value">{rows.length}</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">集計期間</div>
              <div className="kpi-value kpi-value--small">{fromMonth} 〜 {toMonth}</div>
            </div>
          </div>

          {/* Bar Chart */}
          <h2>カテゴリ別売上</h2>
          <div className="section">
            <div className="bar-chart">
              {categories.map(cat => (
                <div key={cat.category} className="bar-row">
                  <div className="bar-label">{cat.category}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(cat.totalRevenue / maxRevenue) * 100}%`,
                        background: CATEGORY_COLORS[cat.category] ?? 'var(--purple)',
                      }}
                    />
                    <span className="bar-value">{formatCurrency(cat.totalRevenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Table */}
          <h2>カテゴリ別詳細</h2>
          <div className="section">
            <table>
              <thead>
                <tr>
                  <th>カテゴリ</th>
                  <th style={{ textAlign: 'right' }}>売上合計</th>
                  <th style={{ textAlign: 'right' }}>売上比率</th>
                  <th style={{ textAlign: 'right' }}>販売数量</th>
                  <th style={{ textAlign: 'right' }}>取引件数</th>
                  <th style={{ textAlign: 'right' }}>平均取引額</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.category}>
                    <td>
                      <span
                        className="category-dot"
                        style={{ background: CATEGORY_COLORS[cat.category] ?? 'var(--purple)' }}
                      />
                      {cat.category}
                    </td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(cat.totalRevenue)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="badge">
                        {((cat.totalRevenue / totalRevenue) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      {cat.totalQuantity.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>{cat.transactionCount}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      {formatCurrency(cat.avgOrderValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly Trend */}
          <h2>月別売上推移</h2>
          <div className="section">
            <table>
              <thead>
                <tr>
                  <th>月</th>
                  {allCategories.map(cat => (
                    <th key={cat} style={{ textAlign: 'right' }}>
                      <span
                        className="category-dot"
                        style={{ background: CATEGORY_COLORS[cat] ?? 'var(--purple)' }}
                      />
                      {cat}
                    </th>
                  ))}
                  <th style={{ textAlign: 'right' }}>月計</th>
                </tr>
              </thead>
              <tbody>
                {months.map(month => {
                  const monthTotal = allCategories.reduce(
                    (sum, cat) => sum + (monthlyData[month][cat] ?? 0), 0
                  )
                  return (
                    <tr key={month}>
                      <td>{month}</td>
                      {allCategories.map(cat => (
                        <td key={cat} style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                          {monthlyData[month][cat]
                            ? formatCurrency(monthlyData[month][cat])
                            : <span style={{ color: 'var(--muted)' }}>—</span>}
                        </td>
                      ))}
                      <td style={{ textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(monthTotal)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="footer">
        データソース: <code>public/sample_data/sales.csv</code>
      </div>
    </main>
  )
}
