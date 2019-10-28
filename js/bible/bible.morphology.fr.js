/* language tools */
if (typeof(window.bible) == 'undefined')
	window.bible = {};
	
bible.morphology = {};
bible.morphology.Greek = {
    partsOfSpeech: {
        N: 'nom',
        A: 'adjectif',
        T: 'article',
        V: 'verbe',
        P: 'pronom personnel',
        R: 'pronom relatif',
        C: 'pronom réfléchi',
        D: 'pronom démonstratif',
        K: 'pronom de liaison',
        I: 'pronom interrogatif',
        X: 'pronom indéfini',
        Q: 'pronom de liaison ou interrogatif',
        F: 'pronom réfléchi',
        S: 'pronom possesif',
        ADV: 'adverbe',
        CONJ: 'conjonction',
        COND: 'cond',
        PRT: 'particule',
        PREP: 'préposition',
        INJ: 'interjection',
        ARAM: 'araméen',
        HEB: 'hébreu'
    },

    getPartofSpeech: function(pos) {
        var full = this.partsOfSpeech[pos.toUpperCase()];

        return (full != null) ? full : '?';
    },

    nounCases: {
        'N': 'nominatif',
        'V': 'vocatif',
        'G': 'génitif',
        'D': 'datif',
        'A': 'accusatif',
	'P': 'nom propre'
    },

    wordNumber: {
        'S': 'singulier',
        'P': 'pluriel'
    },

    wordGender: {
        'M': 'masculin',
        'F': 'féminin',
        'N': 'neutre'
    },

    wordPerson: {
        '1': '1e',
        '2': '2e',
        '3': '3e'
    },

    verbTenses: {
        'P': 'présent',
        'I': 'imparfait',
        '1F': 'futur',
        'F': 'futur',
        '2F': 'futur antérieur',
        'A': 'aoriste',
        '1A': 'aoriste',		
        '2A': 'aoriste 2nd',
        '3A': 'aoriste 3e',	
        '1R': 'parfait',		
        'R': 'parfait',
        '2R': 'parfait 2nd',
        'L': 'plus-que-parfait',
        '1L': 'plus-que-parfait',		
        '2L': 'plus-que-parfait 2nd',
        'X': 'pas de temps indiqué'
    },

    verbVoices: {
        'A': 'actif',
        'M': 'moyen',
        'P': 'passif',
        'E': 'moyen ou passif',
        'D': 'moyen déponent',
        'O': 'passif déponent',
        'N': 'moyen or passif déponent',
        'Q': 'actif impersonnel',
        'X': 'pas de voix'
    },

    verbMoods: {
        'I': 'indicatif',
        'S': 'subjonctif',
        'O': 'optatif',
        'M': 'impératif',
        'N': 'infinitif',
        'P': 'participe',
        'R': 'impératif participe'
    },

    getMorphology: function(morph) {
	pp="<span class='morphtxt'>";
	var firstDash = morph.indexOf('-'),
	pos = ((firstDash > -1) ? morph.substring(0, firstDash) : morph).toUpperCase(),
	info = (firstDash > -1) ? morph.substring(firstDash+1) : '';
	if(pos.length==1){
		pp += this.partsOfSpeech[pos.substring(0,1)];
	}else if(pos.length==2){
		pp += this.partsOfSpeech[pos.substring(0,1)] +', '+ this.partsOfSpeech[pos.substring(1,2)];;
	}else{
		pp += pos;
	}
	pp+= " ; ";
        switch (pos.substring(0, 1).toUpperCase()) {
            case 'T':
            case 'N':
                var c = this.nounCases[info.substring(0, 1)];
                var n = this.wordNumber[info.substring(1, 2)];
                var g = this.wordGender[info.substring(2, 3)];
                pp += c + ((n) ? ', ' + n + ((g) ? ', ' + g : '') : '');
            case 'A':
                var c = this.nounCases[info.substring(0, 1)];
                var n = this.wordNumber[info.substring(1, 2)];
                pp += c + ', ' + n;
            case 'V':
                var t = '';
                var rem = ''
                if (info.substring(0, 1) == '2' || info.substring(0, 1) == '1' || info.substring(0, 1) == '3') {
                    t = this.verbTenses[info.substring(0, 2)];
                    rem = info.substring(2);
                } else {
                    t = this.verbTenses[info.substring(0, 1)];
                    rem = info.substring(1);
                }
                var v = this.verbVoices[rem.substring(0, 1)];
                var m = this.verbMoods[rem.substring(1, 2)];

                if (rem.length == 2) {
                    pp += info + ': ' + t + ', ' + v + ', ' + m;
                } else if (rem.length == 5) {
                    var p = this.wordPerson[rem.substring(3, 4)];
                    var n = this.wordNumber[rem.substring(4, 5)];
                    pp += t + ', ' + v + ', ' + m + ', ' + p + ', ' + n;

                } else if (rem.length == 6) {
                    var c = this.nounCases[rem.substring(3, 4)];
                    var n = this.wordNumber[rem.substring(4, 5)];
                    var g = this.wordGender[rem.substring(5, 6)];

                    pp += t + ', ' + v + ', ' + m + ', ' + c + ', ' + n + ', ' + g;
                }
	    case 'R':
		var c = this.nounCases[info.substring(0, 1)];
                var n = this.wordNumber[info.substring(1, 2)];
		var g="";
                if (info.length>2){var g = this.wordGender[info.substring(2, 3)];}
                pp += c + ((n) ? ', ' + n + ((g) ? ', ' + g : '') : '');

                //m = this.verbMoods[info.substring(2+offset,3+offset)];
            default:
               pp += info;
	return pp + "</span>";
        }
    }
}
