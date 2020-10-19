export default {
    computed: {
        // using mixins to externalise popular functions

        // Will return diarys that match search
        filteredDiarys: function () {
            return this.diarys.filter((diary) => { 
                return diary.content.toLowerCase().match(this.search.toLowerCase());
            })
        },
        // Will return the current date
        displayDate: function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            return today;
        }
    }
}
