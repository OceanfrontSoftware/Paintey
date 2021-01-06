<template>
    <div class='tool'>
        <input type="range" value="5" min="1" max="20"/>
        <p>{{componentData.description}}</p>
        
    </div>
</template>

<script>
export default {
    props: ['componentData']
}
</script>

