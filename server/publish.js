Meteor.publish('high-scores', function() {
	return HighScores.find({userId: this.userId});
});