var memo = new Map();
memo.set("1", BigInt(0));
memo.set("2", BigInt(1));

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let nth = req.body.nth
    if (nth < 0)
        throw 'must be greater than 0'
    function fibomemo(x) {
        context.log(x)
        return memo.has(x.toString()) ? memo.get(x.toString()) : fibo(x);
    }

    function fibo(nh) {
        let res = fibomemo(nh - 1n) + fibomemo(nh - 2n);
        memo.set(nh.toString(), res)
        return res;
    }
    context.res = {
        headers: { 'Content-Type': 'application/json' },
        body: {"res":fibomemo(BigInt(nth)).toString()}
    };
    context.done();
}

