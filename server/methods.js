Meteor.methods({
	addHighScore: function(opts) {
		var sortBy = opts.sort || -1;
		var compare = opts.sort === 1 ? function(s,h) {
				return (s < h);
			} : function(s,h) {
				return (s > h);
			};
		var highs = HighScores.find({userId:this.userId, game:opts.game}, {sort: {score: sortBy}}).fetch();

		if(highs.length < 5) {
			HighScores.insert({
				userId: this.userId,
				game: opts.game,
				score: opts.score,
				board: opts.board
			});
		} else if(highs[4] && highs[4]._id && highs[4].score) {
			if(compare(opts.score,highs[4].score)) {
				HighScores.update(highs[4]._id, {$set: {
					score: opts.score,
					board: opts.board
				}});
			}
		}
	}
});