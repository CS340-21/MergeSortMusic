function mergesort(playlist){
        var low = 0;
        var high = playlist.length - 1;
        var matchups = 0;
        var len = playlist.length;
        var worstCase = Math.ceil((len * Math.log2(len)) - Math.pow(2, Math.log2(len)) + 1);
        var temp = [...playlist];

        var m;
        var i;
        var frm;
        var mid;
        var to;
        console.log("hello")
        for(m = 1; m <= high - low; m = 2*m){
                for(i = low; i < high; i = i + (m * 2)){
                        frm = i;
                        mid = i + m - 1;
                        to = Math.min(i + (2 * m) - 1, high);
                        matchups = merge(playlist, temp, frm, mid, to, matchups, worstCase);
                        console.log(matchups)
                }
        }
}

function merge(playlist, temp, frm, mid, to, matchups, worstCase){
        var k = frm;
        var i = frm;
        var j = mid + 1;

        //i and j point to songs in the playlist that are being sorted
        while(i <= mid && j <= to){
                matchups = matchups + 1;
                //Prompt user for choice
                //Inside of the if statement conditional is the only thing that needs to be changed
                if(playlist[i] < playlist[j]){
                        temp[k] = playlist[i];
                        i = i + 1;
                }else{
                        temp[k] = playlist[j];
                        j = j + 1;
                }
                k = k + 1;
        }

        //Populate the rest of the temp playlist with the rest of the songs in playlist
        //so that below, the entire playlist is copied over from temp to playlist
        while(i < playlist.length && i <= mid){
                temp[k] = playlist[i];
                k = k + 1;
                i = i + 1;
        }

        //Copy over choice from temp array to playlist array
        var q;
        for(q = frm; q < to + 1; q = q + 1){
                playlist[q] = temp[q];
        }

        return matchups;

}

var playlist = ["hello","bye","why", "look", "here", "there"]
mergesort(playlist)
