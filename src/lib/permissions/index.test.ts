import { describe, expect, it } from 'vitest'
import { can, permissionsFor } from './index'

describe('permission matrix', () => {
  it('keeps integration management away from viewers', () => {
    expect(can('viewer', 'integrations.manage')).toBe(false)
    expect(can('owner', 'integrations.manage')).toBe(true)
  })
  it('gives finance report and expense access', () => {
    expect(permissionsFor('finance')).toEqual(
      expect.arrayContaining(['finance.manage', 'reports.generate']),
    )
  })
})
