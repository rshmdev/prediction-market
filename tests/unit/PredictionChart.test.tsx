import { render, screen } from '@testing-library/react'
import PredictionChart from '@/components/PredictionChart'

const data = [
  { date: new Date('2026-01-01T00:00:00.000Z'), price: 45 },
  { date: new Date('2026-01-01T01:00:00.000Z'), price: 55 },
]

const series = [
  { key: 'price', name: 'Price', color: '#F59E0B' },
]

describe('predictionChart', () => {
  it('honors explicit empty y-axis ticks', () => {
    const { container } = render(
      <PredictionChart
        data={data}
        series={series}
        width={400}
        height={220}
        showXAxis={false}
        yAxis={{ ticks: [] }}
      />,
    )

    expect(container.querySelectorAll('text')).toHaveLength(0)
  })

  it('dedupes repeated explicit y-axis ticks', () => {
    render(
      <PredictionChart
        data={data}
        series={series}
        width={400}
        height={220}
        showXAxis={false}
        showHorizontalGrid={false}
        yAxis={{ ticks: [0, 50, 50, 100] }}
      />,
    )

    expect(screen.getAllByText('50%')).toHaveLength(1)
  })
})
