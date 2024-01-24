<template>
  <view class="games_options">
    <zhnavbar :title="navtitle" :lefticon="lefticon"></zhnavbar>
    <uni-collapse ref="collapse" @change="change">
      <uni-collapse-item title="Games Option">
        <view class="text2">1. When are sports bets settled?</view>
        <view class="text">
          1. Single bet payout: Under normal circumstances, betting on a single
          game will be completed within 15 to 30 minutes after the end of the
          game to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, game interruption,etc.) .
          <br />
          <br />
          Standard bet types and odds: <br />
          <br />
          2. First half payout: Under normal circumstances, the first half
          betting will be completed within 30 minutes after the end of the first
          half to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, interrupted, etc. Condition).
          <br />
          <br />
          3. A series of pass payouts: Under normal circumstances, a series of
          pass will be paid within 2 hours after the end of the last series of
          pass events in your bet, after the official announcement of the
          result, some events may take longer to process (such as cutting in
          half, interruption of the game, etc.). <br />
          <br />
          The sum of the 20 numbers in the lottery result is greater than 810
          (large), and the sum of the 20 numbers in the lottery result is less
          than 810 (small) <br />
          <br />
          4. Financial payouts: Financial bets are generally paid out before
          9:00 p.m., please wait at ease.
        </view>
        <br /><br />
        <view class="text2">
          2. What is the definition of sports betting hazard ball? Betting on an
          odd number wins; if there are more than 10 even numbers among the 20
          numbers in the lottery result, it is an even number, and betting on an
          even number is a win. If there are exactly 10 odd numbers and 10 even
          numbers among the 20 numbers in the lottery result , betting on a tie
          wins.
        </view>
        <br /><br />
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'. Hazard balls are defined as:
          <br /><br />

          1.12 yard free throws
          <br /><br />

          2. Free kick (the free kick of the attacking side near the defensive
          penalty area). (gold), 696-763 (wood), 764-855 (water), 856-923 (fire)
          and 924-1410 (earth).
          <br /><br />

          3. Corner kick/throw-in (throw-in by the attacking side close to the
          defender's penalty area). Players can choose 1 to 5 numbers from 01 to
          80 numbers. The Happy Lottery official system will issue 20 numbers
          from 01 to 80 numbers. The payout method is calculated according to
          the number of numbers selected by the player and the result of the
          lottery , There is no limit to the sequence of numbers.
          <br /><br />

          4. Team A attacks near Team B's penalty area (or Team B attacks near
          Team A's penalty area).
        </view>
        <br /><br />

        <view class="text2">
          3. In the following situations, the bet slip placed by the member will
          be cancelled, and the amount bet by the member will be refunded in
          full?
          <br /><br />
        </view>
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'.
          <br /><br />

          1. A goal 2. Red card
        </view>
        <br /><br />

        <view class="text2">
          4. In the following situations, the dangerous ball will be released,
          and the member's betting slip on the dangerous ball will be based on
          the handicap, odds and amount bet at that time?
          <br /><br />
        </view>
        <view class="text">
          1. The goalkeeper kicks off the ball.
          <br /><br />

          2. The ball goes back to the midfield line.
          <br /><br />

          3. One's own player regains possession of the ball in his own
          backcourt.
          <br /><br />

          4. Offensive and defensive transition, the original defensive side
          takes a free kick in its own backcourt.
        </view>
        <br /><br />

        <view class="text2"> 5. Interruption of sporting events? </view>
        <br /><br />
        <view class="text">
          1. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright.
          <br /><br />

          2. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright. Certain unconditionally terminated
          markets will be settled accordingly. The settlement procedure for such
          markets is described in the separate Sports Regulations. The result of
          the company canceling all bets on the event is considered final and
          does not need to refer to the decision of the official event referee
          or relevant departments. String betting will continue to be settled
          according to the results of the remaining events in the bet slip, and
          the odds of the canceled event will be calculated as 1.
          <br /><br />
          3. If there is a clear result before the interruption of the game and
          there is no significant situation that will affect the result of the
          game, the over/under bet will only be settled.
        </view>
        <br /><br />

        <view class="text2"> 6. Sports betting amount? </view>
        <br /><br />
        <view class="text"
          >1. The minimum betting amount for a single pass is: 10 yuan. <br />
          2. The minimum amount for a chain pass and a double chain is 0.5 yuan.
          <br />
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="Real Question">
        <view class="text2">1. When are sports bets settled?</view>
        <view class="text">
          1. Single bet payout: Under normal circumstances, betting on a single
          game will be completed within 15 to 30 minutes after the end of the
          game to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, game interruption,etc.) .
          <br />
          <br />
          Standard bet types and odds: <br />
          <br />
          2. First half payout: Under normal circumstances, the first half
          betting will be completed within 30 minutes after the end of the first
          half to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, interrupted, etc. Condition).
          <br />
          <br />
          3. A series of pass payouts: Under normal circumstances, a series of
          pass will be paid within 2 hours after the end of the last series of
          pass events in your bet, after the official announcement of the
          result, some events may take longer to process (such as cutting in
          half, interruption of the game, etc.). <br />
          <br />
          The sum of the 20 numbers in the lottery result is greater than 810
          (large), and the sum of the 20 numbers in the lottery result is less
          than 810 (small) <br />
          <br />
          4. Financial payouts: Financial bets are generally paid out before
          9:00 p.m., please wait at ease.
        </view>
        <br /><br />
        <view class="text2">
          2. What is the definition of sports betting hazard ball? Betting on an
          odd number wins; if there are more than 10 even numbers among the 20
          numbers in the lottery result, it is an even number, and betting on an
          even number is a win. If there are exactly 10 odd numbers and 10 even
          numbers among the 20 numbers in the lottery result , betting on a tie
          wins.
        </view>
        <br /><br />
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'. Hazard balls are defined as:
          <br /><br />

          1.12 yard free throws
          <br /><br />

          2. Free kick (the free kick of the attacking side near the defensive
          penalty area). (gold), 696-763 (wood), 764-855 (water), 856-923 (fire)
          and 924-1410 (earth).
          <br /><br />

          3. Corner kick/throw-in (throw-in by the attacking side close to the
          defender's penalty area). Players can choose 1 to 5 numbers from 01 to
          80 numbers. The Happy Lottery official system will issue 20 numbers
          from 01 to 80 numbers. The payout method is calculated according to
          the number of numbers selected by the player and the result of the
          lottery , There is no limit to the sequence of numbers.
          <br /><br />

          4. Team A attacks near Team B's penalty area (or Team B attacks near
          Team A's penalty area).
        </view>
        <br /><br />

        <view class="text2">
          3. In the following situations, the bet slip placed by the member will
          be cancelled, and the amount bet by the member will be refunded in
          full?
          <br /><br />
        </view>
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'.
          <br /><br />

          1. A goal 2. Red card
        </view>
        <br /><br />

        <view class="text2">
          4. In the following situations, the dangerous ball will be released,
          and the member's betting slip on the dangerous ball will be based on
          the handicap, odds and amount bet at that time?
          <br /><br />
        </view>
        <view class="text">
          1. The goalkeeper kicks off the ball.
          <br /><br />

          2. The ball goes back to the midfield line.
          <br /><br />

          3. One's own player regains possession of the ball in his own
          backcourt.
          <br /><br />

          4. Offensive and defensive transition, the original defensive side
          takes a free kick in its own backcourt.
        </view>
        <br /><br />

        <view class="text2"> 5. Interruption of sporting events? </view>
        <br /><br />
        <view class="text">
          1. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright.
          <br /><br />

          2. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright. Certain unconditionally terminated
          markets will be settled accordingly. The settlement procedure for such
          markets is described in the separate Sports Regulations. The result of
          the company canceling all bets on the event is considered final and
          does not need to refer to the decision of the official event referee
          or relevant departments. String betting will continue to be settled
          according to the results of the remaining events in the bet slip, and
          the odds of the canceled event will be calculated as 1.
          <br /><br />
          3. If there is a clear result before the interruption of the game and
          there is no significant situation that will affect the result of the
          game, the over/under bet will only be settled.
        </view>
        <br /><br />

        <view class="text2"> 6. Sports betting amount? </view>
        <br /><br />
        <view class="text"
          >1. The minimum betting amount for a single pass is: 10 yuan. <br />
          2. The minimum amount for a chain pass and a double chain is 0.5 yuan.
          <br />
        </view>
      </uni-collapse-item>
	  <uni-collapse-item title="Esports Issue">
        <view class="text2">1. When are sports bets settled?</view>
        <view class="text">
          1. Single bet payout: Under normal circumstances, betting on a single
          game will be completed within 15 to 30 minutes after the end of the
          game to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, game interruption,etc.) .
          <br />
          <br />
          Standard bet types and odds: <br />
          <br />
          2. First half payout: Under normal circumstances, the first half
          betting will be completed within 30 minutes after the end of the first
          half to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, interrupted, etc. Condition).
          <br />
          <br />
          3. A series of pass payouts: Under normal circumstances, a series of
          pass will be paid within 2 hours after the end of the last series of
          pass events in your bet, after the official announcement of the
          result, some events may take longer to process (such as cutting in
          half, interruption of the game, etc.). <br />
          <br />
          The sum of the 20 numbers in the lottery result is greater than 810
          (large), and the sum of the 20 numbers in the lottery result is less
          than 810 (small) <br />
          <br />
          4. Financial payouts: Financial bets are generally paid out before
          9:00 p.m., please wait at ease.
        </view>
        <br /><br />
        <view class="text2">
          2. What is the definition of sports betting hazard ball? Betting on an
          odd number wins; if there are more than 10 even numbers among the 20
          numbers in the lottery result, it is an even number, and betting on an
          even number is a win. If there are exactly 10 odd numbers and 10 even
          numbers among the 20 numbers in the lottery result , betting on a tie
          wins.
        </view>
        <br /><br />
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'. Hazard balls are defined as:
          <br /><br />

          1.12 yard free throws
          <br /><br />

          2. Free kick (the free kick of the attacking side near the defensive
          penalty area). (gold), 696-763 (wood), 764-855 (water), 856-923 (fire)
          and 924-1410 (earth).
          <br /><br />

          3. Corner kick/throw-in (throw-in by the attacking side close to the
          defender's penalty area). Players can choose 1 to 5 numbers from 01 to
          80 numbers. The Happy Lottery official system will issue 20 numbers
          from 01 to 80 numbers. The payout method is calculated according to
          the number of numbers selected by the player and the result of the
          lottery , There is no limit to the sequence of numbers.
          <br /><br />

          4. Team A attacks near Team B's penalty area (or Team B attacks near
          Team A's penalty area).
        </view>
        <br /><br />

        <view class="text2">
          3. In the following situations, the bet slip placed by the member will
          be cancelled, and the amount bet by the member will be refunded in
          full?
          <br /><br />
        </view>
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'.
          <br /><br />

          1. A goal 2. Red card
        </view>
        <br /><br />

        <view class="text2">
          4. In the following situations, the dangerous ball will be released,
          and the member's betting slip on the dangerous ball will be based on
          the handicap, odds and amount bet at that time?
          <br /><br />
        </view>
        <view class="text">
          1. The goalkeeper kicks off the ball.
          <br /><br />

          2. The ball goes back to the midfield line.
          <br /><br />

          3. One's own player regains possession of the ball in his own
          backcourt.
          <br /><br />

          4. Offensive and defensive transition, the original defensive side
          takes a free kick in its own backcourt.
        </view>
        <br /><br />

        <view class="text2"> 5. Interruption of sporting events? </view>
        <br /><br />
        <view class="text">
          1. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright.
          <br /><br />

          2. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright. Certain unconditionally terminated
          markets will be settled accordingly. The settlement procedure for such
          markets is described in the separate Sports Regulations. The result of
          the company canceling all bets on the event is considered final and
          does not need to refer to the decision of the official event referee
          or relevant departments. String betting will continue to be settled
          according to the results of the remaining events in the bet slip, and
          the odds of the canceled event will be calculated as 1.
          <br /><br />
          3. If there is a clear result before the interruption of the game and
          there is no significant situation that will affect the result of the
          game, the over/under bet will only be settled.
        </view>
        <br /><br />

        <view class="text2"> 6. Sports betting amount? </view>
        <br /><br />
        <view class="text"
          >1. The minimum betting amount for a single pass is: 10 yuan. <br />
          2. The minimum amount for a chain pass and a double chain is 0.5 yuan.
          <br />
        </view>
      </uni-collapse-item>
	  <uni-collapse-item title="Lottery Problem">
        <view class="text2">1. When are sports bets settled?</view>
        <view class="text">
          1. Single bet payout: Under normal circumstances, betting on a single
          game will be completed within 15 to 30 minutes after the end of the
          game to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, game interruption,etc.) .
          <br />
          <br />
          Standard bet types and odds: <br />
          <br />
          2. First half payout: Under normal circumstances, the first half
          betting will be completed within 30 minutes after the end of the first
          half to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, interrupted, etc. Condition).
          <br />
          <br />
          3. A series of pass payouts: Under normal circumstances, a series of
          pass will be paid within 2 hours after the end of the last series of
          pass events in your bet, after the official announcement of the
          result, some events may take longer to process (such as cutting in
          half, interruption of the game, etc.). <br />
          <br />
          The sum of the 20 numbers in the lottery result is greater than 810
          (large), and the sum of the 20 numbers in the lottery result is less
          than 810 (small) <br />
          <br />
          4. Financial payouts: Financial bets are generally paid out before
          9:00 p.m., please wait at ease.
        </view>
        <br /><br />
        <view class="text2">
          2. What is the definition of sports betting hazard ball? Betting on an
          odd number wins; if there are more than 10 even numbers among the 20
          numbers in the lottery result, it is an even number, and betting on an
          even number is a win. If there are exactly 10 odd numbers and 10 even
          numbers among the 20 numbers in the lottery result , betting on a tie
          wins.
        </view>
        <br /><br />
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'. Hazard balls are defined as:
          <br /><br />

          1.12 yard free throws
          <br /><br />

          2. Free kick (the free kick of the attacking side near the defensive
          penalty area). (gold), 696-763 (wood), 764-855 (water), 856-923 (fire)
          and 924-1410 (earth).
          <br /><br />

          3. Corner kick/throw-in (throw-in by the attacking side close to the
          defender's penalty area). Players can choose 1 to 5 numbers from 01 to
          80 numbers. The Happy Lottery official system will issue 20 numbers
          from 01 to 80 numbers. The payout method is calculated according to
          the number of numbers selected by the player and the result of the
          lottery , There is no limit to the sequence of numbers.
          <br /><br />

          4. Team A attacks near Team B's penalty area (or Team B attacks near
          Team A's penalty area).
        </view>
        <br /><br />

        <view class="text2">
          3. In the following situations, the bet slip placed by the member will
          be cancelled, and the amount bet by the member will be refunded in
          full?
          <br /><br />
        </view>
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'.
          <br /><br />

          1. A goal 2. Red card
        </view>
        <br /><br />

        <view class="text2">
          4. In the following situations, the dangerous ball will be released,
          and the member's betting slip on the dangerous ball will be based on
          the handicap, odds and amount bet at that time?
          <br /><br />
        </view>
        <view class="text">
          1. The goalkeeper kicks off the ball.
          <br /><br />

          2. The ball goes back to the midfield line.
          <br /><br />

          3. One's own player regains possession of the ball in his own
          backcourt.
          <br /><br />

          4. Offensive and defensive transition, the original defensive side
          takes a free kick in its own backcourt.
        </view>
        <br /><br />

        <view class="text2"> 5. Interruption of sporting events? </view>
        <br /><br />
        <view class="text">
          1. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright.
          <br /><br />

          2. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright. Certain unconditionally terminated
          markets will be settled accordingly. The settlement procedure for such
          markets is described in the separate Sports Regulations. The result of
          the company canceling all bets on the event is considered final and
          does not need to refer to the decision of the official event referee
          or relevant departments. String betting will continue to be settled
          according to the results of the remaining events in the bet slip, and
          the odds of the canceled event will be calculated as 1.
          <br /><br />
          3. If there is a clear result before the interruption of the game and
          there is no significant situation that will affect the result of the
          game, the over/under bet will only be settled.
        </view>
        <br /><br />

        <view class="text2"> 6. Sports betting amount? </view>
        <br /><br />
        <view class="text"
          >1. The minimum betting amount for a single pass is: 10 yuan. <br />
          2. The minimum amount for a chain pass and a double chain is 0.5 yuan.
          <br />
        </view>
      </uni-collapse-item>
	  <uni-collapse-item title="Other Problems">
        <view class="text2">1. When are sports bets settled?</view>
        <view class="text">
          1. Single bet payout: Under normal circumstances, betting on a single
          game will be completed within 15 to 30 minutes after the end of the
          game to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, game interruption,etc.) .
          <br />
          <br />
          Standard bet types and odds: <br />
          <br />
          2. First half payout: Under normal circumstances, the first half
          betting will be completed within 30 minutes after the end of the first
          half to confirm the result and return the prize. Some events may take
          longer to process (such as cut in half, interrupted, etc. Condition).
          <br />
          <br />
          3. A series of pass payouts: Under normal circumstances, a series of
          pass will be paid within 2 hours after the end of the last series of
          pass events in your bet, after the official announcement of the
          result, some events may take longer to process (such as cutting in
          half, interruption of the game, etc.). <br />
          <br />
          The sum of the 20 numbers in the lottery result is greater than 810
          (large), and the sum of the 20 numbers in the lottery result is less
          than 810 (small) <br />
          <br />
          4. Financial payouts: Financial bets are generally paid out before
          9:00 p.m., please wait at ease.
        </view>
        <br /><br />
        <view class="text2">
          2. What is the definition of sports betting hazard ball? Betting on an
          odd number wins; if there are more than 10 even numbers among the 20
          numbers in the lottery result, it is an even number, and betting on an
          even number is a win. If there are exactly 10 odd numbers and 10 even
          numbers among the 20 numbers in the lottery result , betting on a tie
          wins.
        </view>
        <br /><br />
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'. Hazard balls are defined as:
          <br /><br />

          1.12 yard free throws
          <br /><br />

          2. Free kick (the free kick of the attacking side near the defensive
          penalty area). (gold), 696-763 (wood), 764-855 (water), 856-923 (fire)
          and 924-1410 (earth).
          <br /><br />

          3. Corner kick/throw-in (throw-in by the attacking side close to the
          defender's penalty area). Players can choose 1 to 5 numbers from 01 to
          80 numbers. The Happy Lottery official system will issue 20 numbers
          from 01 to 80 numbers. The payout method is calculated according to
          the number of numbers selected by the player and the result of the
          lottery , There is no limit to the sequence of numbers.
          <br /><br />

          4. Team A attacks near Team B's penalty area (or Team B attacks near
          Team A's penalty area).
        </view>
        <br /><br />

        <view class="text2">
          3. In the following situations, the bet slip placed by the member will
          be cancelled, and the amount bet by the member will be refunded in
          full?
          <br /><br />
        </view>
        <view class="text">
          When a member bets live, if the following situations occur in the
          field, the member's bet will remain in the state of 'dangerous ball-to
          be confirmed'.
          <br /><br />

          1. A goal 2. Red card
        </view>
        <br /><br />

        <view class="text2">
          4. In the following situations, the dangerous ball will be released,
          and the member's betting slip on the dangerous ball will be based on
          the handicap, odds and amount bet at that time?
          <br /><br />
        </view>
        <view class="text">
          1. The goalkeeper kicks off the ball.
          <br /><br />

          2. The ball goes back to the midfield line.
          <br /><br />

          3. One's own player regains possession of the ball in his own
          backcourt.
          <br /><br />

          4. Offensive and defensive transition, the original defensive side
          takes a free kick in its own backcourt.
        </view>
        <br /><br />

        <view class="text2"> 5. Interruption of sporting events? </view>
        <br /><br />
        <view class="text">
          1. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright.
          <br /><br />

          2. If a match or event is canceled, interrupted or delayed and is not
          restarted within 36 hours of the official kick- off time, all bets on
          that event will be void and void, unless otherwise specified in the
          individual sports rules bright. Certain unconditionally terminated
          markets will be settled accordingly. The settlement procedure for such
          markets is described in the separate Sports Regulations. The result of
          the company canceling all bets on the event is considered final and
          does not need to refer to the decision of the official event referee
          or relevant departments. String betting will continue to be settled
          according to the results of the remaining events in the bet slip, and
          the odds of the canceled event will be calculated as 1.
          <br /><br />
          3. If there is a clear result before the interruption of the game and
          there is no significant situation that will affect the result of the
          game, the over/under bet will only be settled.
        </view>
        <br /><br />

        <view class="text2"> 6. Sports betting amount? </view>
        <br /><br />
        <view class="text"
          >1. The minimum betting amount for a single pass is: 10 yuan. <br />
          2. The minimum amount for a chain pass and a double chain is 0.5 yuan.
          <br />
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navtitle: "Game Options",
      lefticon: true,
    };
  },
  methods: {
    change(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.games_options {
  padding: 0 74.50rpx 40rpx 54rpx;
  /deep/.uni-collapse-item-border {
    border-bottom: none;
  }
  /deep/.uni-collapse-item__title-text {
    color: #292c3b;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 700;
    line-height: 136.002%; /* 16.32px */
  }
  /deep/.uni-collapse-item__title-box{
	padding: 0;
  }
  /deep/.uniui-bottom{
	font-size: 40rpx;
  }
  .text2 {
    color: #292c3b;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  } 
  /deep/.text {
    color: #a4a7b6 !important;
    font-family: Microsoft YaHei UI;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
