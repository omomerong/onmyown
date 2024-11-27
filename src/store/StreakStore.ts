import { makeAutoObservable } from 'mobx'

class StreakStore {
  streak: number = 0 // 현재 연속 스트릭
  freezeChance: number = 1 // 스트릭 유지 기회

  constructor() {
    makeAutoObservable(this)
  }

  // 투두 태스크 완료 시 streak 증가
  completeTask() {
    this.streak++
  }

  // 다음날 스트릭 연장 실패 시 처리
  failToExtendStreak() {
    if (this.freezeChance > 0) {
      this.freezeChance-- // freeze 기회 사용
    } else {
      this.resetStreak()
    }
  }

  // 스트릭 초기화
  resetStreak() {
    this.streak = 0
    this.freezeChance = 1 // 초기화 후 freeze 기회 복원
  }
}

export default new StreakStore()
