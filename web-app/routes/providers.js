var express = require('express');
var router = express.Router();
var _ = require("underscore");

// Pre-load list of providers
var providers = require('../public/data/providers.json');

// Parse answers from session hash into a more readable JSON object
var parsedAnswers = function(answers) {
  // Mocked for now
  return {
    gender: "male",
    age: "under 29",
    interests: ["medical assistance", "other"]
  }
}

// Filter the providers list based on the answers in the session hash
var filteredProviders = function(answers) {
  // Question IDs and answers:
  // "1" - Interests: "1" (Shelter), "2" (Food), "3" (Medical)
  // "2" - Gender: "1" (Male), "2" (Female), "3" (Other)
  // "3" - Age: (numeric/string)
  filtered = filterProvidersByInterests(providers, answers['1']);
  filtered = filterProvidersByGender(filtered, answers['2']);
  filtered = filterProvidersByAge(filtered, answers['3']);
  return filtered;
}

// Filter providers by gender
var filterProvidersByGender = function(providers, answer) {
  switch(answer) {
    case '1': // Men only and all
      return _.filter(providers, function(provider) {
        return provider['Gender'] == 'men' || provider['Gender'] == 'all';
      });
    case '2': // Women only and all
      return _.filter(providers, function(provider) {
        return provider['Gender'] == 'women' || provider['Gender'] == 'all';
      });
    default: // Only all
      return _.filter(providers, function(provider) {
        return provider['Gender'] == 'all';
      });
  }
  return providers;
}

// Filter providers by interests
var filterProvidersByInterests = function(providers, answer) {
  // Mocked, just returns unfiltered results
  return providers;
}

// Filter providers by age
var filterProvidersByAge = function(providers, answer) {
  return _.filter(providers, function(provider) {
    return parseInt(provider['MinAge']) <= parseInt(answer) &&
           parseInt(provider['MaxAge']) >= parseInt(answer);
  });
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('provider_table', {
    providers: filteredProviders(req.session.answers),
    answers: parsedAnswers(req.session.answers)
  });
});

module.exports = router;
